-- drop function repair.inflow_by_pk;
create function repair.inflow_by_pk(uuid)
returns jsonb
as $$
    begin
        return coalesce(
            (select to_jsonb(i) from repair.inflows i where pk = $1),
            (select error.not_found())
        );
    end;
$$ language plpgsql;

-- drop function repair.save_inflow_details;
create function repair.save_inflow_details(user_id uuid, details jsonb)
returns void
as $$
    begin
        insert into repair.inflow_details(pk, inflow, outflow, amount, discount, notes)
        select
            d.pk, d.inflow, d.outflow, d.amount, d.discount, d.notes
        from jsonb_array_elements(details) e

        cross join lateral (
            select
                repair.save_outflow(user_id, e->'outflow')
            where
                jsonb_typeof(e->'outflow') = 'object' and
                (e->'outflow')::jsonb <> '{}'::jsonb
        ) op

        cross join lateral jsonb_to_record(clean_object(e->'detail'))
        as d(pk uuid, inflow uuid, outflow uuid, amount float, discount float, notes text)

        on conflict(pk) do update set
            inflow = excluded.inflow,
            outflow = excluded.outflow,
            amount = excluded.amount,
            discount = excluded.discount,
            notes = excluded.notes;
    end;
$$ language plpgsql;

-- drop function repair.save_inflow;
create function repair.save_inflow(user_id uuid, data jsonb)
returns jsonb
as $$
    begin
        perform audit.set_user(user_id);

        if jsonb_typeof(data->'customer') = 'object' and (data->'customer')::jsonb <> '{}'::jsonb then
            perform party.save_customer(user_id, data->'customer');
        end if;

        insert into repair.inflows(pk, id, customer, datetime, notes)
        select
            i.pk, i.id, i.customer, i.date, i.notes
        from jsonb_to_record(clean_object(data->'inflow'))
        as i(pk uuid, id text, customer uuid, date timestamptz, notes text)

        on conflict(pk) do update set
            id = excluded.id,
            customer = excluded.customer,
            datetime = excluded.datetime,
            notes = excluded.notes;

        perform repair.save_inflow_details(user_id, (data->'inflow')->'details');
        return repair.inflow_by_pk(((data->'inflow')->>'pk')::uuid);
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
    'inflow', jsonb_build_object(
        'pk', uuid(),
        'id', md5(random()::text),
        'customer', uuid(),
        'date', current_timestamp,
        'notes', md5(random()::text),
        'details', jsonb_build_array(
            jsonb_build_object(
                'detail', jsonb_build_object(
                    'pk', uuid(),
                    'inflow', uuid(),
                    'outflow', uuid(),
                    'amount', random(),
                    'discount', random()
                ),
                'outflow', jsonb_build_object(
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
                )
            )
        )
    )
);


























