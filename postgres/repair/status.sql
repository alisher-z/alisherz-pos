-- drop function repair.status_by_pk;
create function repair.status_by_pk(uuid)
returns jsonb
as $$
    begin
        return coalesce(
            (select to_jsonb(s) from repair.statuses s where pk = $1),
            (select error.not_found())
        );
    end;
$$ language plpgsql;

-- drop function repair.ticket_status_by_pk;
create function repair.ticket_status_by_pk(uuid)
returns jsonb
as $$
    begin
        return coalesce(
            (select to_jsonb(t) from repair.ticket_statuses t where pk = $1),
            (select error.not_found())
        );
    end;
$$ language plpgsql;

-- drop function repair.save_status;
create function repair.save_status(user_id uuid, jsonb)
returns jsonb
as $$
    begin
        perform audit.set_user(user_id);

        insert into repair.statuses(pk, name, notes)
        select
            s.pk, s.name, s.notes
        from jsonb_to_record(clean_object($1))
        as s(pk uuid, name text, notes text)

        on conflict(pk) do update set
            name = excluded.name,
            notes = excluded.notes;

        return repair.status_by_pk(($1->>'pk')::uuid);
    end;
$$ language plpgsql;

-- drop function repair.save_ticket_status;
create function repair.save_ticket_status(user_id uuid, data jsonb)
returns jsonb
as $$
    begin
        perform audit.set_user(user_id);

        if jsonb_typeof(data->'ticket') = 'object' and data->'ticket' <> '{}'::jsonb then
            perform repair.save_ticket(user_id, data->'ticket');
        end if;

        if jsonb_typeof(data->'status') = 'object' and data->'status' <> '{}'::jsonb then
            perform repair.save_status(user_id, data->'status');
        end if;

        insert into repair.ticket_statuses(pk, ticket, status, datetime)
        select
            t.pk, t.ticket, t.status, t.date
        from jsonb_to_record(clean_object(data->'tstatus'))
        as t(pk uuid, ticket uuid, status uuid, date timestamptz)

        on conflict (pk) do update set
            ticket = excluded.ticket,
            status = excluded.status,
            datetime = excluded.datetime;

        return repair.ticket_status_by_pk((data->'tstatus'->>'pk')::uuid);
    end;
$$ language plpgsql;

select * from repair.statuses;
select * from repair.ticket_statuses;

