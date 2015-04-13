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
using System.Web.Http.OData;
using System.Web.Http.OData.Routing;
using System.Web.Http.ModelBinding;


namespace SafetyTraining.Web.Controllers
{
    public class ChecklistsController2 : ApiController
    {
        private PixisSafetyDBEntities db = new PixisSafetyDBEntities();

        // GET api/Checklists
        [Queryable]
        public IQueryable<Checklist> GetChecklists()
        {
            return db.Checklists;
        }

        // GET api/Checklists(5)
        [Queryable]
        public SingleResult<Checklist> GetChecklist([FromODataUri] int key)
        {
            return SingleResult.Create(db.Checklists.Where(checklist => checklist.ChecklistID == key));
        }

        // PUT api/Checklists(5)
        public IHttpActionResult Put([FromODataUri] int key, Checklist checklist)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (key != checklist.ChecklistID)
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
                if (!ChecklistExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(checklist);
        }

        // POST api/Checklists
        public IHttpActionResult Post(Checklist checklist)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Checklists.Add(checklist);
            db.SaveChanges();

            return Ok(checklist);
        }

        // PATCH api/Checklists(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<Checklist> patch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Checklist checklist = db.Checklists.Find(key);
            if (checklist == null)
            {
                return NotFound();
            }

            patch.Patch(checklist);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChecklistExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(checklist);
        }

        // DELETE odata/Checklists(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            Checklist checklist = db.Checklists.Find(key);
            if (checklist == null)
            {
                return NotFound();
            }

            db.Checklists.Remove(checklist);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ChecklistExists(int key)
        {
            return db.Checklists.Count(e => e.ChecklistID == key) > 0;
        }
    }
}