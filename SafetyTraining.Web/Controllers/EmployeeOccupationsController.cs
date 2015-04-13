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
    public class EmployeeOccupationsController : ApiController
    {
        private PixisSafetyDBEntities db = new PixisSafetyDBEntities();

        // TODO: no EmployeeOccupations table

        //// GET odata/EmployeeOccupations
        //[Queryable]
        //public IQueryable<vEmployeeOccupation1> GetEmployeeOccupations()
        //{
        //    return db.vEmployeeOccupation1;
        //}

        //// GET odata/EmployeeOccupations(5)
        //[Queryable]
        //public SingleResult<vEmployeeOccupation1> GetvEmployeeOccupation([FromODataUri] string key)
        //{
        //    return SingleResult.Create(db.vEmployeeOccupation1.Where(vemployeeoccupation => vemployeeoccupation.Occupation == key));
        //}

        //// PUT odata/EmployeeOccupations(5)
        //[NotHas("ReadOnly")]
        //public IHttpActionResult Put([FromODataUri] string key, vEmployeeOccupation1 vemployeeoccupation)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (key != vemployeeoccupation.Occupation)
        //    {
        //        return BadRequest();
        //    }

        //    db.Entry(vemployeeoccupation).State = System.Data.Entity.EntityState.Modified;

        //    try
        //    {
        //        db.SaveChanges();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!vEmployeeOccupationExists(key))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return Updated(vemployeeoccupation);
        //}

        //// POST odata/EmployeeOccupations
        //[NotHas("ReadOnly")]
        //public IHttpActionResult Post(vEmployeeOccupation1 vemployeeoccupation)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    db.vEmployeeOccupation1.Add(vemployeeoccupation);

        //    try
        //    {
        //        db.SaveChanges();
        //    }
        //    catch (DbUpdateException)
        //    {
        //        if (vEmployeeOccupationExists(vemployeeoccupation.Occupation))
        //        {
        //            return Conflict();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return Created(vemployeeoccupation);
        //}

        //// PATCH odata/EmployeeOccupations(5)
        //[AcceptVerbs("PATCH", "MERGE")]
        //[NotHas("ReadOnly")]
        //public IHttpActionResult Patch([FromODataUri] string key, Delta<vEmployeeOccupation1> patch)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    vEmployeeOccupation1 vemployeeoccupation = db.vEmployeeOccupation1.Find(key);
        //    if (vemployeeoccupation == null)
        //    {
        //        return NotFound();
        //    }

        //    patch.Patch(vemployeeoccupation);

        //    try
        //    {
        //        db.SaveChanges();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!vEmployeeOccupationExists(key))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return Updated(vemployeeoccupation);
        //}

        //// DELETE odata/EmployeeOccupations(5)
        //[NotHas("ReadOnly")]
        //public IHttpActionResult Delete([FromODataUri] string key)
        //{
        //    vEmployeeOccupation1 vemployeeoccupation = db.vEmployeeOccupation1.Find(key);
        //    if (vemployeeoccupation == null)
        //    {
        //        return NotFound();
        //    }

        //    db.vEmployeeOccupation1.Remove(vemployeeoccupation);
        //    db.SaveChanges();

        //    return StatusCode(HttpStatusCode.NoContent);
        //}

        //protected override void Dispose(bool disposing)
        //{
        //    if (disposing)
        //    {
        //        db.Dispose();
        //    }
        //    base.Dispose(disposing);
        //}

        //private bool vEmployeeOccupationExists(string key)
        //{
        //    return db.vEmployeeOccupation1.Count(e => e.Occupation == key) > 0;
        //}
    }
}