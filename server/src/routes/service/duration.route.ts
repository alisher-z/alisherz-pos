import { Request, Response } from "express";
import { getRole } from "../../db/role.db";

export async function getDuration(req: Request, res: Response) {
   const user = getRole('admin', '66408');
   if (!user)
      return res.status(500).send({ error: ['something is wrong!'] });

   try {
      const result = await user.query('select get_duration($1)', [req.body.duration]);
      res.send(result.rows[0].get_duration);
   }

   catch (e: any) {
      console.log(e);
      res.send({
         hours: 0,
         duration: null
      });
   }
}

export async function getDurations(req: Request, res: Response) {
   const user = getRole('admin', '66408');
   if (!user)
      return res.status(500).send({
         error: ['something is wrong!']
      });


   try {
      const result = await user.query(
         'select get_durations($1)',
         [JSON.stringify(req.body)]
      );
      res.send(result.rows[0].get_durations);
   }


   catch (e: any) {
      console.log(e);
      res.send(req.body);
   }
}