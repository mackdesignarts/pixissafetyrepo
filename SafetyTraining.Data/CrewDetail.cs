//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SafetyTraining.Data
{
    using System;
    using System.Collections.Generic;
    
    public partial class CrewDetail
    {
        public int CrewDetailID { get; set; }
        public int CrewID { get; set; }
        public int EmployeeID { get; set; }
        public Nullable<System.DateTime> CreatedOn { get; set; }
        public Nullable<System.DateTime> ModifiedOn { get; set; }
    
        public virtual Crew Crew { get; set; }
    }
}