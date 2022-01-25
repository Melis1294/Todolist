using System;
using Microsoft.EntityFrameworkCore;

namespace TodolistAPI.Models
{

    public class ApplicationDbContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite("Data Source=/Users/klajdi.myftari/Projects/TodolistAPI/DBs/MySqliteDb_1.db");

        public DbSet<TaskDetail> Tasks { get; set; }
    }
}
