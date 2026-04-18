-- drop function product.inventory_by_pk;
create function product.inventory_by_pk(uuid)
returns jsonb
as $$
    declare inventory jsonb;
    begin
        select jsonb_build_object(
            'pk', i.pk, 'id', i.id, 'vendor', i.vendor, 'date', i.datetime, 'notes', i.notes,
            'items', jsonb_agg(
                jsonb_build_object(
                    'pk', ii.pk, 'inventory', ii.inventory, 'product', ii.product, 'quantity', ii.quantity, 'cost', ii.cost, 'notes', ii.notes
                )
            )
        ) into inventory
        from product.inventories i
        join product.inventory_items ii
        on i.pk = ii.inventory
        where i.pk = $1
        group by i.pk;

        if inventory is null then
            perform error.not_found();
        end if;

        return inventory;
    end;
$$ language plpgsql;

-- drop function product.save_inventory;
create function product.save_inventory(user_id uuid, data jsonb)
returns jsonb
as $$
    begin
        perform audit.set_user(user_id);

        if data ? 'vendor' then
            perform party.save_vendor(user_id, data->'vendor');
        end if;

        insert into product.inventories(pk, id, vendor, datetime, notes)
        select
            i.pk, i.id, i.vendor, i.date, i.notes
        from jsonb_to_record(clean_object(data->'inventory'))
        as i(pk uuid, id text, vendor uuid, date timestamptz, notes text)

        on conflict(pk) do update set
            id = excluded.id,
            vendor = excluded.vendor,
            datetime = excluded.datetime,
            notes = excluded.notes;

        perform product.save_inventory_items(user_id, data->'inventory'->'item');
        return product.inventory_by_pk((data->'inventory'->>'pk')::uuid);
    end;
$$language plpgsql;

-- drop function product.save_inventory_items;
create function product.save_inventory_items(user_id uuid, details jsonb)
returns void
as $$
    declare
        deletes jsonb := (details->'deletes')::jsonb;
        saves jsonb := (details->'saves')::jsonb;
        raw jsonb;
    begin
        if deletes is not null and jsonb_typeof(deletes) = 'array' then
            delete from product.inventory_items where pk in(
                select jsonb_array_elements_text(deletes)::uuid
            );
        end if;

        for raw in select * from jsonb_array_elements(saves)
        loop
            if raw ? 'product' then
                perform product.save_self(user_id, raw->'product');
            end if;

            insert into product.inventory_items(pk, inventory, product, quantity, cost, notes)
            select
                i.pk, i.inventory, i.product, i.quantity, i.cost, i.notes
            from jsonb_to_record(clean_object(raw->'item'))
            as i(pk uuid, inventory uuid, product uuid, quantity int, cost float, notes text)

            on conflict (pk) do update set
                inventory = excluded.inventory,
                product = excluded.product,
                quantity = excluded.quantity,
                cost = excluded.cost,
                notes = excluded.notes;
        end loop;
    end;
$$ language plpgsql;

-- drop function product.inventory_list;
create function product.inventory_list(qry jsonb default null)
returns table(pk uuid, id text, vendor uuid, date timestamptz, notes text, created timestamptz)
as $$
    begin
        return query
            select
                i.pk, i.id::text, i.vendor, i.datetime, i.notes, extract_datetime(i.pk)
            from product.inventories i;
    end;
$$ language plpgsql;

select * from product.inventories;

select * from product.inventory_items;

select * from product.inventory_by_pk('019bf43a-0361-756a-a1d6-5fb1fc628eb5');






















select jsonb_build_object(
    'vendor', jsonb_build_object(
        'pk', uuid(),
        'id', md5(random()::text),
        'name', md5(random()::text),
        'phone', md5(random()::text),
        'email', md5(random()::text)||'@gmail.com',
        'address', md5(random()::text),
        'notes', md5(random()::text),
        'active', true
    ),
    'inventory', jsonb_build_object(
        'pk', uuid(),
        'id', md5(random()::text),
        'vendor', uuid(),
        'date', current_timestamp,
        'notes', md5(random()::text),
        'items', jsonb_build_array(
            jsonb_build_object(
                'product', jsonb_build_object(
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
                'item', jsonb_build_object(
                    'pk', uuid(),
                    'inventory', uuid(),
                    'product', uuid(),
                    'quantity', 1,
                    'cost', random(),
                    'notes', md5(random()::text)
                )
            )
        )
    )
);