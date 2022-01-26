using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodolistAPI.Models
{
    public class TaskDetailDTO
    {

        [Key]
        public int id { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")] //max char numbers
        public string title { get; set; }
        [Column(TypeName = "nvarchar(5000)")]
        public string description { get; set; }

        public string shortDescription { get; set; }

        public bool taskCompleted { get; set; }

        private int descriptionLength { get; set; }

        public TaskDetailDTO()
        {

        }

        // map class values into DTO class
        public TaskDetailDTO(int id, string title, string description, bool completed)
        {
            this.id = id;
            this.title = title;
            this.description = description;
            taskCompleted = completed;
            descriptionLength = 10;

            shortDescription = description.Length < descriptionLength ? description : description.Substring(0, descriptionLength);
        }

        // translate class into DTO class
        public TaskDetailDTO(TaskDetail task)
        {
            id = task.Id;
            title = task.Title;
            description = task.Description;
            taskCompleted = task.Completed;
            descriptionLength = 10;

            shortDescription = task.Description.Length < 10 ? task.Description : task.Description.Substring(0, descriptionLength);
        }
    }
}
