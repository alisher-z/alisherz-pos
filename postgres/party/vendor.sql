-- drop function party.vendor_by_pk;
create function party.vendor_by_pk(uuid)
returns jsonb
as $$
    declare vendor jsonb;
    begin
        select jsonb_build_object(
            'pk', v.pk,
            'id', v.id,
            'name', v.name,
            'phone', v.phone,
            'email', v.email,
            'address', v.address,
            'notes', v.notes,
            'active', v.is_active
        ) into vendor
        from party.vendors v
        where v.pk = $1;

        if vendor is null then
            perform error.not_found();
        end if;

        return vendor;
    end;
$$ language plpgsql;

-- drop function party.save_vendor;
create function party.save_vendor(user_id uuid, jsonb)
returns jsonb
as $$
    begin
        perform audit.set_user(user_id);

         insert into party.vendors(pk, id, name, phone, email, address, notes, is_active)
         select
             vendor.pk,
             vendor.id,
             vendor.name,
             vendor.phone,
             vendor.email,
             vendor.address,
             vendor.notes,
             vendor.active
         from jsonb_to_record(clean_object($2))
         as vendor(pk uuid, id text, name text, phone text, email text, address text, notes text, active bool)

         on conflict (pk)
         do update set
            id =        excluded.id,
            name =      excluded.name,
            phone =     excluded.phone,
            email =     excluded.email,
            address =   excluded.address,
            notes =     excluded.notes,
            is_active = excluded.is_active;
         return party.vendor_by_pk(($2->>'pk')::uuid);
    end;
$$ language plpgsql;

select jsonb_build_object(
    'pk', uuid(),
    'id', md5(random()::text),
    'name', md5(random()::text),
    'phone', md5(random()::text),
    'email', md5(random()::text)||'@gmail.com',
    'address', md5(random()::text),
    'notes', md5(random()::text),
    'active', true
);

drop function party.vendor_list;
create function party.vendor_list(qry jsonb default null)
returns table(pk uuid, id citext, name text, phone citext, email mail, address text, notes text, active bool, created timestamptz)
as $$
    declare
        limit_  int  := coalesce((qry ->> 'limit')::int, 750);
        offset_ int  := coalesce((qry ->> 'page')::int,0) * limit_;
        pk_ uuid := nullif(qry->>'pk','')::uuid;
        search_ text := nullif(lower(trim(qry ->> 'search')), '')::text;
        sql_ text;
    begin
        if pk_ is not null then
            return query
            select
                v.pk, v.id, v.name, v.phone, v.email, v.address, v.notes, v.is_active, extract_datetime(v.pk)
            from party.vendors v
            where v.pk >= pk_
            order by v.pk limit limit_; return;
        end if;

        if search_ is null then
            return query
            select v.pk, v.id, v.name, v.phone, v.email, v.address, v.notes, v.is_active, extract_datetime(v.pk)
            from party.vendors v order by v.pk limit limit_ offset offset_; return;
        end if;

        sql_ := format('
            select v.pk, v.id, v.name, v.phone, v.email, v.address, v.notes, v.is_active, extract_datetime(v.pk)
            from party.vendors v
            where v.search_vector %s
            order by position($3 in v.search_vector), search_vector
            limit $1 offset $2',
            case when length(search_) <= 25
                then 'like ''%''||$3||''%'''
                else '% $3'
            end);
        return query execute sql_ using limit_, offset_, search_;
    end;
$$ language plpgsql;

select * from party.vendors order by pk desc limit 1;


































