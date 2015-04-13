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

namespace SafetyTraining.Web.Controllers
{
    public class LocationCodeController : ApiController
    {
        private PixisSafetyDBEntities db = new PixisSafetyDBEntities();

        // GET odata/LocationCode
        public IQueryable<LocationCode> GetLocationCode()
        {
            return db.LocationCodes;
        }

        // GET odata/LocationCode(5)
        public SingleResult<LocationCode> GetLocationCode(int key)
        {
            return SingleResult.Create(db.LocationCodes.Where(locationcode => locationcode.LocationCodeID == key));
        }

        // PUT odata/LocationCode(5)
        public IHttpActionResult Put(int key, LocationCode locationcode)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (key != locationcode.LocationCodeID)
            {
                return BadRequest();
            }

            db.Entry(locationcode).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LocationCodeExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(locationcode);
        }

        // POST odata/LocationCode
        public IHttpActionResult Post(LocationCode locationcode)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.LocationCodes.Add(locationcode);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (LocationCodeExists(locationcode.LocationCodeID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Ok(locationcode);
        }

        // PATCH odata/LocationCode(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch(int key, Delta<LocationCode> patch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            LocationCode locationcode = db.LocationCodes.Find(key);
            if (locationcode == null)
            {
                return NotFound();
            }

            patch.Patch(locationcode);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LocationCodeExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(locationcode);
        }

        // DELETE odata/LocationCode(5)
        public IHttpActionResult Delete(int key)
        {
            LocationCode locationcode = db.LocationCodes.Find(key);
            if (locationcode == null)
            {
                return NotFound();
            }

            db.LocationCodes.Remove(locationcode);
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

        private bool LocationCodeExists(int key)
        {
            return db.LocationCodes.Count(e => e.LocationCodeID == key) > 0;
        }
    }
}