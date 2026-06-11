drop function if exists outflow_by_pk;
create function outflow_by_pk(uuid)
returns jsonb
as $$
    declare outflow jsonb;
    begin
        select jsonb_build_object(
            'pk',o.pk,
            'id', o.id,
            'customer', o.customer,
            'date', o.datetime,
            'notes', o.notes
        ) into outflow
        from outflows as o
        where o.pk = $1;
        if outflow is null then perform error.not_found(); end if;
    end;
$$ language plpgsql;

-- save outflow data
drop function if exists save_outflow ;
create function save_outflow(user_id uuid, data jsonb)
returns jsonb
as $$
begin
    perform audit.set_user(user_id);

    insert into outflows(pk, id, customer, datetime, notes)
    select o.pk, o.id, o.customer, o.date, o.notes
    from jsonb_to_record(clean_object(data->'outflow')) as o(
        pk uuid, id text, customer uuid, date timestamptz, notes text
    )

    on conflict(pk) do update set
        id = excluded.id,
        customer = excluded.customer,
        datetime = excluded.datetime,
        notes = excluded.notes;

    if data ? 'ticket' then
        insert into repair.outflow_tickets(pk, outflow, ticket)
        select t.pk, t.outflow, t.ticket
        from jsonb_to_record(clean_object(data->'ticket')) as t(
            pk uuid, outflow uuid, ticket uuid
        )
        on conflict(pk) do update set
            outflow = excluded.outflow,
            ticket = excluded.ticket;
    end if;

    if data->'item' ? 'product' then
        perform product.save_outflow_items(data->'item'->'product');
    end if;
    if data->'item' ? 'repair' then
        perform repair.save_outflow_items(data->'item'->'repair');
    end if;
    if data->'service' ? 'repair' then
        perform repair.save_outflow_services(data->'service'->'repair');
    end if;

    return outflow_by_pk((data->'outflow'->>'pk')::uuid);
end;
$$ language plpgsql;

-- save outflow items for product
drop function product.save_outflow_items;
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

-- save outflow items for repair
drop function repair.save_outflow_items;
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
            select
                item.pk,
                item.outflow,
                item.product,
                item.price,
                item.quantity,
                nullif(trim(item.notes),'')
            from jsonb_to_recordset(saves) as item(
                pk uuid, outflow uuid, product uuid, price uuid, quantity int, notes text
            )

            on conflict(pk) do update set
                outflow = excluded.outflow,
                product = excluded.product,
                price = excluded.price,
                quantity = excluded.quantity,
                notes = excluded.notes;
        end if;
    end;
$$ language plpgsql;

-- save outflow services for repair
drop function repair.save_outflow_services;
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
            select
                s.pk,
                s.outflow,
                s.service,
                s.price,
                s.duration,
                nullif(trim(s.notes),'')
            from jsonb_to_recordset(saves) as s(
                pk uuid, outflow uuid, service uuid, price uuid, duration interval, notes text
            )

            on conflict (pk) do update set
            outflow = excluded.outflow,
            service = excluded.service,
            price = excluded.price,
            duration = excluded.duration,
            notes = excluded.notes;
        end if;
    end;
$$ language plpgsql;