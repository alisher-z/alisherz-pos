-- drop function brand_by_pk(pk_ uuid);
create function brand_by_pk(uuid)
returns jsonb
as $$
    declare brand jsonb;
    begin
        select jsonb_build_object(
            'pk', b.pk,
            'name', b.name,
            'notes', b.notes,
            'active', b.is_active
        ) into brand
        from brands b where b.pk = $1;

        if brand is null then
            perform error.not_found();
        end if;

        return brand;
    end;
$$ language plpgsql;

-- drop function save_brand;
create function save_brand(user_id uuid, jsonb)
returns jsonb
as $$
    begin
        perform audit.set_user(user_id);

        insert into brands(pk, name, notes, is_active)
        select
            brand.pk,
            brand.name,
            brand.notes,
            brand.active
        from jsonb_to_record(clean_object($2))
        as brand(pk uuid, name text, notes text, active bool)

        on conflict (pk)

        do update set
            name = excluded.name,
            notes = excluded.notes,
            is_active = excluded.is_active;

        return brand_by_pk(($2->>'pk')::uuid);
    end;
$$language plpgsql;

select jsonb_build_object(
    'pk', uuid(),
    'name', md5(random()::text),
    'notes', md5(random()::text),
    'active', true
);

-- drop function brand_list;
create function brand_list(qry jsonb default null)
returns table(pk uuid, name text, notes text, active bool, created timestamptz)
as $$
    begin
        return query
            select
                b.pk, b.name::text, b.notes, b.is_active, extract_datetime(b.pk) as created
            from brands b;
    end;
$$ language plpgsql;

select * from brand_by_pk('019afe88-3ddc-78b2-a413-5048557973b7');

select * from party.customers;

