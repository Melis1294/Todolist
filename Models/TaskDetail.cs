using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodolistAPI.Models
{
    public class TaskDetail
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName ="nvarchar(100)")] //max char numbers
        public string Title { get; set; }
        [Column(TypeName = "nvarchar(5000)")]
        public string Description { get; set; }

        public bool Completed { get; set; }
    }
}
