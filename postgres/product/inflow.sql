-- drop function product.inflow_by_pk;
create function product.inflow_by_pk(uuid)
returns jsonb
as $$
    begin
        return coalesce(
            (select to_jsonb(i) from product.inflows as i where pk = $1),
            (select error.not_found())
        );
    end;
$$language plpgsql;

create function product.inflow_by_pk(uuid)
returns jsonb
as $$
    declare inflow jsonb;
    begin
        select jsonb_build_object(
            'pk',i.pk,
            'id', i.id,
            'customer', i.customer,
            'date', i.datetime,
            'notes', i.notes,
            'details', jsonb_agg(
                    jsonb_build_object(
                        'pk', d.pk,
                        'inflow', d.inflow,
                        'outflow', d.outflow,
                        'amount', lat_outflow.amount,
                        'received', d.amount,
                        'due', lat_outflow.amount - d.amount - d.discount,
                        'discount', d.discount,
                        'notes', d.notes
                    )
            )
        ) into inflow
        from product.inflows i
        join product.inflow_details d on i.pk = d.inflow
        join lateral (
            select
                o.pk,
                sum(oi.quantity * p.amount) as amount
            from product.outflows o
            join product.outflow_items oi on o.pk = oi.outflow
            join product.price_histories p on oi.price = p.pk
            where o.pk = d.outflow
            group by o.pk
        ) as lat_outflow on true
        where i.pk = $1
        group by i.pk, i.id, i.customer, i.datetime, i.notes;

        if inflow is null then
            perform error.not_found();
        end if;

        return inflow;
    end;
$$ language plpgsql;

-- drop function product.save_inflow_details;
create function product.save_inflow_details(user_id uuid, details jsonb)
returns void
as $$
    declare
        saves jsonb := details->'saves';
        deletes jsonb := details->'deletes';
    begin
        if deletes is not null and jsonb_typeof(deletes) = 'array' then
            delete from product.inflow_details
            where pk in(select jsonb_array_elements_text(deletes)::uuid);
        end if;

        perform product.save_outflow(
            user_id,
            e->'outflow'
        ) from jsonb_array_elements(saves) e where e?'outflow';

        insert into product.inflow_details(pk, inflow, outflow, amount, discount, notes)
        select
            detail.pk,
            detail.inflow,
            detail.outflow,
            detail.amount,
            detail.discount,
            detail.notes
        from jsonb_array_elements(saves) e
        cross join jsonb_to_record(clean_object(e->'detail'))
        as detail(pk uuid, inflow uuid, outflow uuid, amount float, discount float, notes text)

        on conflict(pk) do update set
            inflow = excluded.inflow,
            outflow = excluded.outflow,
            amount = excluded.amount,
            discount = excluded.discount,
            notes = excluded.notes;
    end;
$$ language plpgsql;

-- drop function product.save_inflow;
create function product.save_inflow(user_id uuid, data jsonb)
returns jsonb
as $$
    begin
        perform audit.set_user(user_id);

        if data ? 'customer' then
            perform party.save_customer(user_id, data->'customer');
        end if;

        insert into product.inflows(pk, id, customer, datetime, notes)
        select
            i.pk, i.id, i.customer, i.date, i.notes
        from jsonb_to_record(clean_object(data->'inflow'))
        as i(pk uuid, id text, customer uuid, date timestamptz, notes text)

        on conflict(pk) do update set
            id = excluded.id,
            customer = excluded.customer,
            datetime = excluded.datetime,
            notes = excluded.notes;

        perform product.save_inflow_details(user_id, data->'inflow'->'detail');
        return product.inflow_by_pk((data->'inflow'->>'pk')::uuid);
    end;
$$ language plpgsql;

-- drop function product.inflow_list;
create function product.inflow_list(qry jsonb default null)
returns table(pk uuid, id text, customer uuid, date timestamptz, notes text, created timestamptz)
as $$
    begin
        return query
            select
                i.pk, i.id::text, i.customer, i.datetime, i.notes, extract_datetime(i.pk)
            from product.inflows i;
    end;
$$language plpgsql;

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
    'inflow', jsonb_build_object(
        'pk', uuid(),
        'id', md5(random()::text),
        'customer', uuid(),
        'date', current_timestamp,
        'notes', md5(random()::text),
        'details', jsonb_build_array(
            jsonb_build_object(
                'outflow', jsonb_build_object(
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
                ),
                'detail', jsonb_build_object(
                    'pk', uuid(),
                    'inflow', uuid(),
                    'outflow', uuid(),
                    'amount', random(),
                    'discount', random(),
                    'notes', md5(random()::text)
                )
            )
        )
    )
);

select to_json(i.*) from product.inflows i;

select to_jsonb(d.*) from product.inflow_details d;

select jsonb_build_object(
        'pk',i.pk,
        'id', i.id,
        'customer', i.customer,
        'date', i.datetime,
        'notes', i.notes,
        'details', jsonb_agg(
                jsonb_build_object(
                    'pk', d.pk,
                    'inflow', d.inflow,
                    'outflow', d.outflow,
                    'amount', lat_outflow.amount,
                    'received', d.amount,
                    'due', lat_outflow.amount - d.amount - d.discount,
                    'discount', d.discount,
                    'notes', d.notes
                )
        )
    )
from product.inflows i
join product.inflow_details d on i.pk = d.inflow
join lateral (
    select
        o.pk,
        sum(oi.quantity * p.amount) as amount
    from product.outflows o
    join product.outflow_items oi on o.pk = oi.outflow
    join product.price_histories p on oi.price = p.pk
    where o.pk = d.outflow
    group by o.pk
) as lat_outflow on true
where i.pk = '019be24a-bed9-726d-9073-37bb3b9910e0'
group by i.pk, i.id, i.customer, i.datetime, i.notes;

select
    o.pk,
    sum(i.quantity * p.amount)
from product.outflows o
join product.outflow_items i on o.pk = i.outflow
join product.price_histories p on i.price = p.pk
group by o.pk;






































































