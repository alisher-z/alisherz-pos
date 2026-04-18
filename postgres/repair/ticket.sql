-- drop function repair.ticket_by_pk;
create function repair.ticket_by_pk(uuid)
returns jsonb
as $$
    declare ticket jsonb;
    begin
        select jsonb_build_object(
            'pk', t.pk,
            'id', t.id,
            'customer', t.customer,
            'device', t.device,
            'date', t.datetime,
            'estimated', t.estimated_amount,
            'problem', t.problem
        ) into ticket
        from repair.tickets t
        where t.pk = $1;

        if ticket is null then
            perform error.not_found();
        end if;

        return ticket;
    end;
$$ language plpgsql;

-- drop function repair.save_ticket;
create function repair.save_ticket(user_id uuid, data jsonb)
returns jsonb
as $$
    begin
        perform audit.set_user(user_id);

        if data ? 'device' then
            perform repair.save_device(user_id, data->'device');
        end if;

        insert into repair.tickets(pk, id, customer, device, datetime, estimated_amount, problem)
        select
            t.pk, t.id, t.customer, t.device, t.date, t.estimated, t.problem
        from jsonb_to_record(clean_object(data->'ticket'))
        as t(pk uuid, id text, customer uuid, device uuid, date timestamptz, estimated float, problem text)

        on conflict(pk) do update set
            id = excluded.id,
            customer = excluded.customer,
            device = excluded.device,
            datetime = excluded.datetime,
            estimated_amount = excluded.estimated_amount,
            problem = excluded.problem;

        return repair.ticket_by_pk((data->'ticket'->>'pk')::uuid);
    end;
$$ language plpgsql;

select jsonb_build_object(
    'device', jsonb_build_object(
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
    ),
    'ticket', jsonb_build_object(
        'pk', uuid(),
        'id', md5(random()::text),
        'device', uuid(),
        'date', current_timestamp,
        'estimated', md5(uuid()::text),
        'problem', md5(random()::text)
    )
);


-- drop function repair.ticket_list;
create function repair.ticket_list(qry jsonb default null)
returns table(pk uuid, id text, date timestamptz, estimated float, problem text, device jsonb)
as $$
    begin
        return query
            select
                t.pk,
                t.id::text,
                t.datetime,
                t.estimated_amount,
                t.problem,
                to_jsonb(d.*) as device
            from repair.tickets t
            join repair.device_list() d on t.device = d.pk;
    end;
$$ language plpgsql;

select * from repair.tickets;
select * from repair.devices;





























