-- drop function product.type_by_pk(pk_ uuid);
create function product.type_by_pk(uuid)
returns jsonb
as $$
    declare ptype jsonb;
    begin
        select jsonb_build_object(
            'pk', t.pk,
            'name', t.name,
            'notes', t.notes,
            'active', t.is_active
        ) into ptype
        from product.types t
        where t.pk = $1;

        if ptype is null then
            perform error.not_found();
        end if;
        return ptype;
    end;
$$ language plpgsql;

-- drop function product.save_type;
create function product.save_type(user_id uuid, jsonb)
returns jsonb
as $$
    begin
        perform audit.set_user(user_id);

        insert into product.types(pk, name, notes, is_active)
        select
            t.pk, t.name, t.notes, t.active
        from jsonb_to_record(clean_object($2))
        as t(pk uuid, name text, notes text, active bool)

        on conflict(pk)

        do update set
            name = excluded.name,
            notes = excluded.notes,
            is_active = excluded.is_active;

        return product.type_by_pk(($2->>'pk')::uuid);
    end;
$$ language plpgsql;

select jsonb_build_object(
    'pk', uuid(),
    'name', md5(random()::text),
    'notes', md5(random()::text),
    'active', true
);
select * from product.types;

-- drop function product.type_list;
create function product.type_list(qry jsonb default null)
returns table(pk uuid, name text, notes text, active bool, created timestamptz)
as $$
    begin
        return query
            select
                t.pk, t.name::text, t.notes, t.is_active, extract_datetime(t.pk) as created
            from product.types t;
    end;
$$ language plpgsql;

select product.type_list(null);

select * from product.type_by_pk('019afe5a-58a3-7feb-8c6f-3b9b112f250b');
