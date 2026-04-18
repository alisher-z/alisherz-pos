-- drop function repair.outflow_by_pk;
create function repair.outflow_by_pk(uuid)
returns jsonb
as $$
    declare outflow jsonb;
    begin
        select to_jsonb(obj) into outflow from(
            select
                o.pk, o.id, o.customer, o.ticket, o.datetime as date, o.notes, item.agg as items, service.agg as services
            from repair.outflows as o
            left join lateral(
                select coalesce(jsonb_agg(items), '[]') as agg
                from (
                    select i.pk, i.outflow, i.product, i.price, i.quantity, i.notes
                    from repair.outflow_items i
                    where i.outflow = o.pk
                ) as items
            ) item on true

            left join lateral(
                select coalesce(jsonb_agg(services), '[]') as agg
                from(
                    select  s.pk, s.outflow, s.service, s.price, s.duration, s.notes
                    from repair.outflow_services s
                    where s.outflow = o.pk
                ) as services
            )service on true
            where o.pk = $1
        ) obj;

        if outflow is null then
            perform error.not_found();
        end if;

        return outflow;
    end;
$$ language plpgsql;

-- drop function repair.save_outflow;
create function repair.save_outflow(user_id uuid, data jsonb)
returns jsonb
as $$
    begin
        perform audit.set_user(user_id);

        insert into repair.outflows(pk, id, customer, ticket, datetime, notes)
        select o.pk, o.id, o.customer, o.ticket, o.date, o.notes
        from jsonb_to_record(clean_object(data))
        as o(pk uuid, id text, customer uuid, ticket uuid, date timestamptz, notes text)

        on conflict (pk) do update set
            id = excluded.id,
            customer = excluded.customer,
            ticket = excluded.ticket,
            datetime = excluded.datetime,
            notes = excluded.notes;

        perform repair.save_outflow_items((data->'item')::jsonb);
        perform repair.save_outflow_services((data->'service')::jsonb);

        return repair.outflow_by_pk((data->>'pk')::uuid);
    end;
$$ language plpgsql;

-- drop function repair.save_outflow_items;
create function repair.save_outflow_items(details jsonb)
returns void
as $$
    declare
        deletes jsonb := (details->'deletes')::jsonb;
        saves jsonb := (details->'saves')::jsonb;

    begin
        if deletes is not null and jsonb_typeof(deletes) = 'array' and jsonb_array_length(deletes) > 0 then
            delete from repair.outflow_items
            where pk in(
                select jsonb_array_elements_text(deletes)::uuid
            );
        end if;
        if saves is not null and jsonb_typeof(saves) = 'array' and jsonb_array_length(saves) > 0 then
            insert into repair.outflow_items(pk, outflow, product, price, quantity, notes)
            select item.pk, item.outflow, item.product, item.price, item.quantity, nullif(trim(item.notes),'')
            from jsonb_to_recordset(saves)
            as item(pk uuid, outflow uuid, product uuid, price uuid, quantity int, notes text)

            on conflict(pk) do update set
                outflow = excluded.outflow,
                product = excluded.product,
                price = excluded.price,
                quantity = excluded.quantity,
                notes = excluded.notes;
        end if;
    end;
$$ language plpgsql;

-- drop function repair.save_outflow_services;
create function repair.save_outflow_services(details jsonb)
returns void
as $$
    declare
        deletes jsonb := (details->'deletes')::jsonb;
        saves jsonb := (details->'saves')::jsonb;

    begin
        if deletes is not null and jsonb_typeof(deletes) = 'array' and jsonb_array_length(deletes) > 0 then
            delete from repair.outflow_services
            where pk in(
                select jsonb_array_elements_text(deletes)::uuid
            );
        end if;

        if saves is not null and jsonb_typeof(saves) = 'array' and jsonb_array_length(saves) > 0 then
            insert into repair.outflow_services(pk, outflow, service, price, duration, notes)
            select s.pk, s.outflow, s.service, s.price, s.duration, nullif(trim(s.notes),'')
            from jsonb_to_recordset(saves)
            as s(pk uuid, outflow uuid, service uuid, price uuid, duration interval, notes text)

            on conflict (pk) do update set
            outflow = excluded.outflow,
            service = excluded.service,
            price = excluded.price,
            duration = excluded.duration,
            notes = excluded.notes;
        end if;
    end;
$$ language plpgsql;

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
    'ticket', jsonb_build_object(
        'device', jsonb_build_object(
            'brand', jsonb_build_object(
                'pk', uuid(),
                'name', md5(random()::text),
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
        ),
        'ticket', jsonb_build_object(
            'pk', uuid(),
            'id', md5(random()::text),
            'device', uuid(),
            'date', current_timestamp,
            'estimated', md5(uuid()::text),
            'problem', md5(random()::text)
        )
    ),
    'outflow', jsonb_build_object(
        'pk', uuid(),
        'id', md5(random()::text),
        'customer', uuid(),
        'ticket', uuid(),
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
            )
        ),
        'services', jsonb_build_array(
            jsonb_build_object(
                'service', jsonb_build_object(
                    'pk', uuid(),
                    'id', md5(random()::text),
                    'name', md5(random()::text),
                    'notes', md5(random()::text)
                ),
                'history', jsonb_build_object(
                    'history', jsonb_build_object(
                        'pk', uuid(),
                        'service', uuid(),
                        'amount', random()
                    )
                ),
                'rservice', jsonb_build_object(
                    'pk', uuid(),
                    'outflow', uuid(),
                    'service', uuid(),
                    'price', uuid(),
                    'duration', '2 hours',
                    'notes', md5(random()::text)
                )
            )
        )
    )
);

-- drop function repair.outflow_list;
create function repair.outflow_list(qry jsonb default null)
returns table(pk uuid, id text, customer uuid, ticket uuid, date timestamptz, notes text, created timestamptz)
as $$
    begin
        return query
            select
                o.pk, o.id::text, o.customer, o.ticket, o.datetime, o.notes, extract_datetime(o.pk)
            from repair.outflows o;
    end;
$$ language plpgsql;






















