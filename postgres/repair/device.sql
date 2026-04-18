-- drop function repair.device_by_pk;
create function repair.device_by_pk(uuid)
returns jsonb
as $$
    declare device jsonb;
    begin
        select jsonb_build_object(
            'pk', d.pk,
            'brand', d.brand,
            'customer', d.customer,
            'model', d.model_number,
            'serial', d.serial_number,
            'notes', d.notes
        ) into device
        from repair.devices d
        where d.pk = $1;

        if device is null then
            perform error.not_found();
        end if;

        return device;
    end;
$$ language plpgsql;

-- drop function repair.save_device;
create function repair.save_device(user_id uuid, data jsonb)
returns jsonb
as $$
    begin
        perform audit.set_user(user_id);

        if data ? 'brand' then
            perform save_brand(user_id, data->'brand');
        end if;

        if data ? 'customer' then
            perform party.save_customer(user_id, data->'customer');
        end if;

        insert into repair.devices(pk, brand, customer, model_number, serial_number, notes)
        select
            d.pk, d.brand, d.customer, d.model, d.serial, d.notes
        from jsonb_to_record(clean_object(data->'device'))
        as d(pk uuid, brand uuid, customer uuid, model text, serial text, notes text)

        on conflict(pk) do update set
         brand = excluded.brand,
         customer = excluded.customer,
         model_number = excluded.model_number,
         serial_number = excluded.serial_number,
         notes = excluded.notes;

        return repair.device_by_pk((data->'device'->>'pk')::uuid);
    end;
$$ language plpgsql;

drop materialized view if exists repair.mv_devices cascade;
create materialized view repair.mv_devices as
    select
        d.pk, b.pk as brand_pk, c.pk as customer_pk, d.model_number, d.serial_number, d.notes,
        lower(concat_ws(' ', b.name, d.model_number, d.serial_number, c.name)) as search_vector,
        jsonb_build_object(
            'pk', b.pk,
            'name', b.name
        ) as brand,
        jsonb_build_object(
            'pk', c.pk,
            'name', c.name
        ) as customer
    from repair.devices as d
    join public.brands as b on d.brand = b.pk
    join party.customers as c on d.customer = c.pk;

create unique index idx_mv_devices_pk on repair.mv_devices(pk);
create index idx_mv_devices_customer_pk on repair.mv_devices(customer_pk);
create index idx_mv_devices_brand_pk on repair.mv_devices(brand_pk);
create index idx_device_search_vector_trg on repair.mv_devices using gin(search_vector gin_trgm_ops);
create index idx_customer_pk_and_search_vector_trgm on repair.mv_devices using gin(customer_pk, search_vector gin_trgm_ops);

drop view if exists repair.vw_devices cascade;
create view repair.vw_devices as
    select pk, model_number, serial_number, brand, customer, notes
    from repair.mv_devices;

drop function if exists repair.device_list_pk;
create function repair.device_list_pk(pk_ uuid, customer_ uuid, lm int, rs bool)
returns setof repair.vw_devices
as $$
    begin
        if rs then
            return query
                (
                    select pk, model_number, serial_number, brand, customer, notes
                    from repair.mv_devices
                    where pk = pk_ limit 1
                ) union all (
                    select pk, model_number, serial_number, brand, customer, notes
                    from repair.mv_devices
                    where pk is distinct from pk_
                    and customer_pk = customer_
                    order by pk limit lm - 1
                );

        else
            return query
                select pk, model_number, serial_number, brand, customer, notes
                from repair.mv_devices
                where pk > pk_ order by pk limit lm;
        end if;
    end;
$$ language plpgsql stable;

drop function if exists repair.device_list_offset;
create function repair.device_list_offset(customer_ uuid, lm int, of int)
returns setof repair.vw_devices
as $$
    select pk, model_number, serial_number, brand, customer, notes
    from repair.mv_devices
    where customer_ is null or customer_pk = customer_
    order by pk limit lm offset of;
$$ language sql stable;

drop function if exists repair.device_list_search;
create function repair.device_list_search(search text, customer_ uuid, lm int, of int)
returns setof repair.vw_devices
as $$
begin
    return query
    select pk, model_number, serial_number, brand, customer, notes
    from repair.mv_devices
    where
        (customer_ is null or customer_pk = customer_) and
        search_vector like '%'||search||'%'
    order by position(search in search_vector), search_vector
    limit lm offset of;
end;
$$ language plpgsql stable;

drop function if exists repair.device_list;
create function repair.device_list(qry jsonb default null)
returns setof repair.vw_devices
as $$
    declare
        lm int := coalesce((qry->>'limit')::int, 750);
        of int := coalesce((qry->>'page')::int, 0) * lm;
        pk uuid := nullif(qry->>'pk', '')::uuid;
        rs bool := (qry->>'reset')::bool;
        search text := nullif(lower(trim(qry->>'search')),'')::text;
        customer uuid := nullif(trim(qry->>'customer'),'')::uuid;
    begin
        if pk is not null then
            return query
            select * from repair.device_list_pk(pk_ := pk, customer_ := customer, lm := lm, rs := rs); return;
        end if;

        if search is null then
            return query
            select * from repair.device_list_offset(customer, lm, of); return;
        end if;

        return query
        select * from repair.device_list_search(search := search, customer_ := customer, lm := lm, of := of);
    end;
$$ language plpgsql stable;

refresh materialized view concurrently repair.mv_devices;

select jsonb_build_object(
    'brand', jsonb_build_object(
        'pk', uuid(),
        'name', md5(random()::text),
        'notes', md5(random()::text),
        'active', true
    ),
    'customer', jsonb_build_object(
        'pk', uuid(),
        'id', md5(random()::text),
        'name', md5(random()::text),
        'phone', md5(random()::text),
        'email', md5(random()::text)||'@gmail.com',
        'address', md5(random()::text),
        'notes', md5(random()::text),
        'active', true
    ),
    'device', jsonb_build_object(
        'pk', uuid(),
        'brand', uuid(),
        'customer', uuid(),
        'model', md5(random()::text),
        'serial', md5(random()::text),
        'notes', md5(random()::text)
    )
);






































