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
    
    public partial class CoursesTaken
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public CoursesTaken()
        {
            this.CoursesTakenHistories = new HashSet<CoursesTakenHistory>();
        }
    
        public int CoursesTakenID { get; set; }
        public Nullable<int> CourseID { get; set; }
        public Nullable<int> EmployeeID { get; set; }
        public Nullable<System.DateTime> CertificationDate { get; set; }
        public Nullable<System.DateTime> CreatedOn { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedOn { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public bool Required { get; set; }
        public Nullable<int> InstructorID { get; set; }
        public Nullable<System.DateTime> ExpireDate { get; set; }
        public Nullable<bool> Expired { get; set; }
        public Nullable<byte> CertificationStatusID { get; set; }
        public Nullable<int> ClassID { get; set; }
        public Nullable<bool> Deleted { get; set; }
    
        public virtual Class Class { get; set; }
        public virtual Course Course { get; set; }
        public virtual Employee Employee { get; set; }
        public virtual Instructor Instructor { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CoursesTakenHistory> CoursesTakenHistories { get; set; }
    }
}