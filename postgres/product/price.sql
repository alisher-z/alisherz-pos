-- drop function product.price_history_by_pk;
create function product.price_history_by_pk(uuid)
returns jsonb
as $$
    declare price_history jsonb;
    begin
        select jsonb_build_object(
            'pk', ph.pk,
            'product', ph.product,
            'amount', ph.amount,
            'notes', ph.notes
        ) into price_history
        from product.price_histories ph
        where ph.pk = $1;

        if price_history is null then
            perform error.not_found();
        end if;

        return price_history;
    end;
$$ language plpgsql;


-- drop function product.save_price_history;
create function product.save_price_history(user_id uuid, data jsonb)
returns jsonb
as $$
    begin
        perform audit.set_user(user_id);

        if (data->'product')::jsonb is not null then
            perform product.save_self(user_id, (data->'product')::jsonb);
        end if;

        insert into product.price_histories(pk, product, amount, notes)
        select
            history.pk, history.product, history.amount, history.notes
        from jsonb_to_record(clean_object((data->'history')::jsonb))
        as history(pk uuid, product uuid, amount float, notes text)

        on conflict(pk)

        do update set
            product = excluded.product,
            amount = excluded.amount,
            notes = excluded.notes;

        perform product.save_current_price(
            (data->'history'->>'product')::uuid,
            (data->'history'->>'pk')::uuid
        );

        return product.price_history_by_pk((data->'history'->>'pk')::uuid);
    end;
$$ language plpgsql;

-- drop function product.save_current_price;
create function product.save_current_price(uuid, uuid)
returns void
as $$
    begin
        insert into product.current_prices(product, price_history)
        values($1, $2) on conflict(product)
        do update set
            product = excluded.product,
            price_history = excluded.price_history;
    end;
$$ language plpgsql;

-- drop function product.price_history_list;
create function product.price_history_list(qry jsonb default null)
returns table(pk uuid, product uuid, amount float, notes text, created timestamptz)
as $$
    begin
        return query
            select
                ph.pk, ph.product, ph.amount, ph.notes, extract_datetime(ph.pk) as created
            from product.price_histories ph;
    end;
$$ language plpgsql;

select jsonb_build_object(
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
        'pk', uuid(),
        'product', uuid(),
        'amount', random(),
        'notes', md5(random()::text)
    )
);
















































