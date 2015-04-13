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
using SafetyTraining.Web.ActionFilters;
using System.Web.Http.OData;

namespace SafetyTraining.Web.Controllers
{
    public class CertificationAgencyController : ApiController
    {
        private PixisSafetyDBEntities db = new PixisSafetyDBEntities();

        // GET odata/CertificationAgency
        [Queryable]
        public IQueryable<CertificationAgency> GetCertificationAgency()
        {
            return db.CertificationAgencies;
        }

        // GET odata/CertificationAgency(5)
        [Queryable]
        public SingleResult<CertificationAgency> GetCertificationAgency(short key)
        {
            return SingleResult.Create(db.CertificationAgencies.Where(certificationagency => certificationagency.CertificationAgencyID == key));
        }

        // PUT odata/CertificationAgency(5)
        [NotHas("ReadOnly")]
        public IHttpActionResult Put(short key, CertificationAgency certificationagency)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (key != certificationagency.CertificationAgencyID)
            {
                return BadRequest();
            }

            db.Entry(certificationagency).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CertificationAgencyExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(certificationagency);
        }

        // POST odata/CertificationAgency
        [NotHas("ReadOnly")]
        public IHttpActionResult Post(CertificationAgency certificationagency)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CertificationAgencies.Add(certificationagency);
            db.SaveChanges();

            return Ok(certificationagency);
        }

        // PATCH odata/CertificationAgency(5)
        [AcceptVerbs("PATCH", "MERGE")]
        [NotHas("ReadOnly")]
        public IHttpActionResult Patch(short key, Delta<CertificationAgency> patch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            CertificationAgency certificationagency = db.CertificationAgencies.Find(key);
            if (certificationagency == null)
            {
                return NotFound();
            }

            patch.Patch(certificationagency);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CertificationAgencyExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(certificationagency);
        }

        // DELETE odata/CertificationAgency(5)
        [NotHas("ReadOnly")]
        public IHttpActionResult Delete([FromODataUri] short key)
        {
            CertificationAgency certificationagency = db.CertificationAgencies.Find(key);
            if (certificationagency == null)
            {
                return NotFound();
            }

            db.CertificationAgencies.Remove(certificationagency);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET odata/CertificationAgency(5)/Courses
        [Queryable]
        public IQueryable<Course> GetCourses([FromODataUri] short key)
        {
            return db.CertificationAgencies.Where(m => m.CertificationAgencyID == key).SelectMany(m => m.Courses);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CertificationAgencyExists(short key)
        {
            return db.CertificationAgencies.Count(e => e.CertificationAgencyID == key) > 0;
        }
    }
}