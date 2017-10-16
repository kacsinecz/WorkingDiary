using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WorkingDiary.Models
{
    public class Day
    {
        public int day;
        public string nameOfDay;
        public List<int> projectId;
        public List<string> projectName;
        public List<string> activity;
        public List<double> hours;
        public bool holiday;

        public Day(int day, string nameOfDay, int projectId, string projectName, string activity, double hours, bool holiday)
        {
            this.projectId = new List<int>();
            this.projectName = new List<string>();
            this.activity = new List<string>();
            this.hours = new List<double>();

            this.day = day;
            this.nameOfDay = nameOfDay;
            this.projectId.Add(projectId);
            this.projectName.Add(projectName);
            this.activity.Add(activity);
            this.hours.Add(hours);
            this.holiday = holiday;
        }

        public Day(int day, string nameOfDay, bool holiday)
        {
            this.projectId = new List<int>();
            this.projectName = new List<string>();
            this.activity = new List<string>();
            this.hours = new List<double>();

            this.day = day;
            this.nameOfDay = nameOfDay;
            this.holiday = holiday;
        }
    }

    public class Project
    {
        public int projectId;
        public string projectName;

        public Project(int project_id, string project_name)
        {
            projectId = project_id;
            projectName = project_name;
        }
    }
 }