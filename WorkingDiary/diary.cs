//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WorkingDiary
{
    using System;
    using System.Collections.Generic;
    
    public partial class diary
    {
        public int diary_id { get; set; }
        public int users_id { get; set; }
        public System.DateTime diary_day { get; set; }
        public int diary_order { get; set; }
        public int project_id { get; set; }
        public string diary_activity { get; set; }
        public double diary_hours { get; set; }
    
        public virtual project project { get; set; }
        public virtual users users { get; set; }
    }
}
