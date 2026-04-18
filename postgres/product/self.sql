-- drop function product.self_by_pk;
create function product.self_by_pk(uuid)
returns jsonb
as $$
    declare product jsonb;
    begin
        select jsonb_build_object(
            'pk', ps.pk,
            'barcode', ps.barcode,
            'name', ps.name,
            'type', ps.type,
            'brand', ps.brand,
            'serial', ps.serial_number,
            'model', ps.model_number,
            'notes', ps.notes
        ) into product
        from product.selves ps
        where ps.pk = $1;

        if product is null then
            perform error.not_found();
        end if;

        return product;
    end;
$$ language plpgsql;

-- drop function product.save_self;
create function product.save_self(user_id uuid, data jsonb)
returns jsonb
as $$
    begin
        perform audit.set_user(user_id);

        if data->'type' is not null then
            perform product.save_type(user_id, (data->'type')::jsonb);
        end if;
        if data->'brand' is not null then
            perform save_brand(user_id, (data->'brand')::jsonb);
        end if;

        insert into product.selves(pk, barcode, name, type, brand, serial_number, model_number, notes)
        select
            product.pk,
            product.barcode,
            product.name,
            product.type,
            product.brand,
            product.serial,
            product.model,
            product.notes
        from jsonb_to_record((data->'product')::jsonb)
        as product(pk uuid, barcode text, name text, type uuid, brand uuid, serial text, model text, notes text)

        on conflict(pk)

        do update set
            barcode = excluded.barcode,
            name = excluded.name,
            type = excluded.type,
            brand = excluded.brand,
            serial_number = excluded.serial_number,
            model_number = excluded.model_number,
            notes = excluded.notes;

        if data->'history' is not null then
            perform product.save_price_history(
                user_id,
                jsonb_build_object(
                    'history', (data->'history')::jsonb
                )
            );
        end if;

        return product.self_by_pk((($2->'product')->>'pk')::uuid);
    end;
$$ language plpgsql;

-- drop view product.vw_selves;
create view product.vw_selves as
    select pk, barcode, name, type, brand, serial_number, model_number, notes
    from product.selves;

-- drop function product.self_list_pk;
create function product.self_list_pk(pk_ uuid, lm int, rs bool)
returns setof product.vw_selves
as $$
begin
if rs then
    return query
        (select * from product.vw_selves where pk = pk_ limit 1)
    union all
        (select * from product.vw_selves where pk is distinct from pk_
                                         order by pk limit lm -1
        );

else
    return query
        select * from product.vw_selves
        where pk > pk_ order by pk limit lm;
end if;
end;
$$ language plpgsql stable;

-- drop function product.self_list_offset;
create function product.self_list_offset(lm int, of int)
returns setof product.vw_selves
as $$
    select * from product.vw_selves order by pk limit lm offset of;
$$ language sql stable;

-- drop function product.self_list_search;
create function product.self_list_search(search text, lm int, of int)
returns setof product.vw_selves
as $$
    select pk, barcode, name, type, brand, serial_number, model_number, notes
    from product.selves
    where search_vector like '%'||search||'%'
    order by position(search in search_vector), search_vector
    limit lm offset of;
$$ language sql stable;

-- drop function product.self_only_list;
create function product.self_only_list(qry jsonb default null)
returns setof product.vw_selves
as $$
    declare
        lm int := coalesce((qry->>'limit')::int, 750);
        of int := coalesce((qry->>'page')::int, 0) * lm;
        pk uuid := nullif(qry->>'pk', '')::uuid;
        rs bool := (qry->>'reset')::bool;
        search text := nullif(lower(trim(qry->>'search')),'')::text;
    begin
        if pk is not null then
            return query select * from product.self_list_pk(pk, lm, rs); return;
        end if;

        if search is null then
            return query select * from product.self_list_offset(lm, of); return;
        end if;

        return query select * from product.self_list_search(search, lm, of);
    end;
$$ language plpgsql;

-- drop function product.self_list;
create function product.self_list(qry jsonb default null)
returns table(pk uuid, barcode citext, name citext, type uuid, brand uuid, serial citext, model text, notes text, created timestamptz, price jsonb, quantity jsonb)
as $$
    begin
        return query select
            ps.*,
            extract_datetime(ps.pk),
            case when ph.pk is null then null else
            jsonb_build_object(
                'pk', ph.pk,
                'amount', ph.amount
            ) end as price,
            case when pi.quantity is null and po.quantity is null then null else
            jsonb_build_object(
                'total', coalesce(pi.quantity,0),
                'out', coalesce(po.quantity,0),
                'left', (coalesce(pi.quantity,0) - coalesce(po.quantity,0))
            ) end as quantity
        from product.self_only_list(qry) as ps
        left join product.current_prices as cp on ps.pk = cp.product
        left join product.price_histories as ph on cp.price_history = ph.pk
        left join lateral (
            select sum(ii.quantity) as quantity
            from product.inventory_items as ii
            where ii.product = ps.pk
        ) as pi on true
        left join lateral (
            select sum(oi.quantity) as quantity
            from product.outflow_items as oi
            where oi.product = ps.pk
        ) as po on true;
    end;
$$ language plpgsql;


select * from product.self_list('{"pk": "019cc2ae-6cf3-759a-9ca9-19a5dffbf49f"}');

select * from product.self_list('{"pk": "019cc2ae-6cf3-759a-9ca9-19a5dffbf49f", "reset": true}');

select * from product.self_list('{"search": "Samsung lkasjdflllkajsdf"}');



































































