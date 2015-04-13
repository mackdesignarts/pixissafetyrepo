using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using SafetyTraining.Data;

namespace SafetyTraining.Web.Controllers
{
    public class ChecklistsController : ApiController
    {
        private PixisSafetyDBEntities db = new PixisSafetyDBEntities();

        // GET api/Checklists
        public IQueryable<Checklist> GetChecklists()
        {
            return db.Checklists;
        }

        // GET api/Checklists/5
        [ResponseType(typeof(Checklist))]
        public IHttpActionResult GetChecklist(int id)
        {
            Checklist checklist = db.Checklists.Find(id);
            if (checklist == null)
            {
                return NotFound();
            }

            return Ok(checklist);
        }

        // PUT api/Checklists/5
        public IHttpActionResult PutChecklist(int id, Checklist checklist)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != checklist.ChecklistID)
            {
                return BadRequest();
            }

            db.Entry(checklist).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChecklistExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST api/Checklists
        [ResponseType(typeof(Checklist))]
        public IHttpActionResult PostChecklist(Checklist checklist)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Checklists.Add(checklist);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = checklist.ChecklistID }, checklist);
        }

        // DELETE api/Checklists/5
        [ResponseType(typeof(Checklist))]
        public IHttpActionResult DeleteChecklist(int id)
        {
            Checklist checklist = db.Checklists.Find(id);
            if (checklist == null)
            {
                return NotFound();
            }

            db.Checklists.Remove(checklist);
            db.SaveChanges();

            return Ok(checklist);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ChecklistExists(int id)
        {
            return db.Checklists.Count(e => e.ChecklistID == id) > 0;
        }
    }
}