-- drop function product.outflow_by_pk;
create function product.outflow_by_pk(uuid)
returns jsonb
as $$
    declare outflow jsonb;
    begin
        select jsonb_build_object(
            'pk', o.pk,
            'id', o.id,
            'customer', o.customer,
            'date', o.datetime,
            'notes', o.notes,
            'items', jsonb_agg(
                    jsonb_build_object(
                        'pk', i.pk,
                        'outflow', i.outflow,
                        'product', i.product,
                        'price', i.price,
                        'quantity', i.quantity,
                        'notes', i.notes
                    )
            )
        ) into outflow
        from product.outflows o
        join product.outflow_items i on o.pk = i.outflow
        where o.pk = $1
        group by o.pk;

        if outflow is null then
            perform error.not_found();
        end if;

        return outflow;
    end;
$$ language plpgsql;

-- drop function product.save_outflow;
create function product.save_outflow(user_id uuid, data jsonb)
returns jsonb
as $$
    begin
        perform audit.set_user(user_id);

        if data ? 'customer' then
            perform party.save_customer(user_id, data->'customer');
        end if;

        insert into product.outflows(pk, id, customer, datetime, notes)
        select
            o.pk, o.id, o.customer, o.date, o.notes
        from jsonb_to_record(clean_object(data->'outflow'))
        as o(pk uuid, id text, customer uuid, date timestamptz, notes text)

        on conflict (pk) do update set
            id = excluded.id,
            customer = excluded.customer,
            datetime = excluded.datetime,
            notes = excluded.notes;

        perform product.save_outflow_items(data->'outflow'->'item');
        return product.outflow_by_pk((data->'outflow'->>'pk')::uuid);
    end;
$$language plpgsql;

-- old one
create function product.save_outflow_items(user_id uuid, items jsonb)
returns void
as $$
    begin
        perform product.save_self(
            user_id,
            e->'product'
        ) from jsonb_array_elements(items) as e
          where e?'product';

        perform product.save_price_history(
            user_id,
            e->'history'
        ) from jsonb_array_elements(items) as e
          where e?'history';

        insert into product.outflow_items(pk, outflow, product, price, quantity, notes)
        select
            item.pk,
            item.outflow,
            item.product,
            item.price,
            item.quantity,
            item.notes
        from jsonb_array_elements(items) e
        cross join jsonb_to_record(clean_object(e->'item'))
        as item(pk uuid, outflow uuid, product uuid, price uuid, quantity int, notes text)

        on conflict(pk) do update set
            outflow = excluded.outflow,
            product = excluded.product,
            price = excluded.price,
            quantity = excluded.quantity,
            notes = excluded.notes;
    end;
$$ language plpgsql;

-- drop function product.save_outflow_items;
create function product.save_outflow_items(details jsonb)
returns void
as $$
    declare
        deletes jsonb := details->'deletes';
        saves jsonb := details->'saves';
    begin
        if deletes is not null and jsonb_typeof(deletes) = 'array' then
            delete from product.outflow_items
            where pk in(
                select jsonb_array_elements_text(deletes)::uuid
            );
        end if;

        insert into product.outflow_items(pk, outflow, product, price, quantity, notes)
        select
            item.pk,
            item.outflow,
            item.product,
            item.price,
            item.quantity,
            nullif(trim(item.notes), '')
        from jsonb_to_recordset(saves) as item(
            pk uuid, outflow uuid, product uuid, price uuid, quantity int, notes text
        )

        on conflict(pk) do update set
            outflow = excluded.outflow,
            product = excluded.product,
            price = excluded.price,
            quantity = excluded.quantity,
            notes = excluded.notes;
    end;
$$ language plpgsql;

-- drop function product.outflow_list;
create function product.outflow_list(qry jsonb default null)
returns table(pk uuid, id text, customer uuid, date timestamptz, notes text, created timestamptz)
as $$
    begin
        return query
            select
                o.pk, o.id::text, o.customer, o.datetime, o.notes, extract_datetime(o.pk) as created
            from product.outflows o;
    end;
$$ language plpgsql;

select * from product.outflow_list();

-- sample data
select jsonb_build_object(
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
    'outflow', jsonb_build_object(
        'pk', uuid(),
        'id', md5(random()::text),
        'customer', uuid(),
        'date', current_timestamp,
        'notes', md5(random()::text),
        'items', jsonb_build_array(
            jsonb_build_object(
                'item', jsonb_build_object(
                    'pk', uuid(),
                    'outflow', uuid(),
                    'product', uuid(),
                    'price', uuid(),
                    'quantity', 2,
                    'notes', md5(random()::text)
                ),
                'product',jsonb_build_object(
                    'type', jsonb_build_object(
                        'pk', uuid(),
                        'name', md5(random()::text),
                        'notes', md5(random()::text),
                        'active', true
                    ),
                    'brand',jsonb_build_object(
                        'pk', uuid(),
                        'name', md5(random()::text),
                        'notes', md5(random()::text),
                        'active', true
                    ),
                    'product',jsonb_build_object(
                        'pk', uuid(),
                        'barcode', md5(random()::text),
                        'name', md5(random()::text),
                        'type', uuid(),
                        'brand', uuid(),
                        'serial', md5(random()::text),
                        'model', md5(random()::text),
                        'notes', md5(random()::text)
                    )
                ),
                'history', jsonb_build_object(
                   'history', jsonb_build_object(
                        'pk', uuid(),
                        'product', uuid(),
                        'amount', random(),
                        'notes', md5(random()::text)
                    )
                )
            ),
            jsonb_build_object(
                'item', jsonb_build_object(
                    'pk', uuid(),
                    'outflow', uuid(),
                    'product', uuid(),
                    'price', uuid(),
                    'quantity', 2,
                    'notes', md5(random()::text)
                ),
                'product',jsonb_build_object(
                    'type', jsonb_build_object(
                        'pk', uuid(),
                        'name', md5(random()::text),
                        'notes', md5(random()::text),
                        'active', true
                    ),
                    'brand',jsonb_build_object(
                        'pk', uuid(),
                        'name', md5(random()::text),
                        'notes', md5(random()::text),
                        'active', true
                    ),
                    'product',jsonb_build_object(
                        'pk', uuid(),
                        'barcode', md5(random()::text),
                        'name', md5(random()::text),
                        'type', uuid(),
                        'brand', uuid(),
                        'serial', md5(random()::text),
                        'model', md5(random()::text),
                        'notes', md5(random()::text)
                    )
                ),
                'history', jsonb_build_object(
                   'history', jsonb_build_object(
                        'pk', uuid(),
                        'product', uuid(),
                        'amount', random(),
                        'notes', md5(random()::text)
                    )
                )
            )
        )
    )
);

select
    jsonb_build_object(
        'pk', po.pk,
        'id', po.id,
        'date', po.datetime,
        'notes', po.notes,
        'customer', jsonb_build_object(
            'pk', pc.pk,
            'id', pc.id,
            'name', pc.name
        )
    ) as outflow,
    jsonb_agg(jsonb_build_object(
        'pk', poi.pk,
        'quantity', poi.quantity,
        'notes', poi.notes,
        'product', jsonb_build_object(
            'pk', ps.pk,
            'name', ps.name,
            'price', pph.amount
        )
    )) as items
from product.outflows po
join party.customers pc on po.customer = pc.pk
join product.outflow_items poi on po.pk = poi.outflow
join product.selves ps on poi.product = ps.pk
join product.current_prices pcp on ps.pk = pcp.product
join product.price_histories pph on pcp.price_history = pph.pk
group by po.pk, pc.pk;

select * from product.outflows;

select * from party.customers;

select * from product.current_prices;

select * from product.price_histories;










































