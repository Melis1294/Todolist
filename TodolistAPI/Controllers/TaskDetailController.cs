using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http.Description;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodolistAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TodolistAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskDetailController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TaskDetailController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/values
        // get all DB entries
        [HttpGet]
        //[ResponseType(typeof(List<TaskDetailDTO>))]
        public async Task<IEnumerable<TaskDetailDTO>> GetTasks()
        {
            /*List<TaskDetail> tasks = await _context.Tasks.ToListAsync();
            IEnumerable<TaskDetailDTO> taskDTOs = from t in tasks select new TaskDetailDTO(t);
            return taskDTOs;*/
            return await _context.Tasks
                .Select(x => TaskToDTO(x))
                .ToListAsync();
        }

        // GET: api/TaskDetail/5
        // get the entry specified by the id
        [HttpGet("{id}")]
        //[ResponseType(typeof(TaskDetailDTO))]
        public async Task<ActionResult<TaskDetailDTO>> GetTaskDetail(int id)
        {
            var taskDetail = await _context.Tasks.FindAsync(id);

            if (taskDetail == null)
            {
                return NotFound();
            }

            return TaskToDTO(taskDetail);
        }

        // PUT: api/TaskDetail/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // To update an existing value
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTaskDetail(int id, TaskDetailDTO taskDetailDTO)
        {
            if (id != taskDetailDTO.id)
            {
                return BadRequest();
            }

            var taskDetail = await _context.Tasks.FindAsync(id);
            if (taskDetail == null)
            {
                return NotFound();
            }

            taskDetail.Title = taskDetailDTO.title;
            taskDetail.Description = taskDetailDTO.description;
            taskDetail.Completed = taskDetailDTO.taskCompleted;

            _context.Entry(taskDetailDTO).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!TaskDetailExists(id))
            {// if application used by multiple users
                return NotFound();
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<TaskDetailDTO>> PostTaskDetail(TaskDetailDTO taskDetailDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var taskDetail = new TaskDetail()
            {
                Title = taskDetailDTO.title,
                Description = taskDetailDTO.description,
                Completed = taskDetailDTO.taskCompleted
            };

            _context.Tasks.Add(taskDetail);
            await _context.SaveChangesAsync();          

            return CreatedAtAction("GetTaskDetail", new { id = taskDetail.Id }, TaskToDTO(taskDetail));
        }

        // DELETE: api/TaskDetail/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTaskDetail(int id)
        {
            var taskDetail = await _context.Tasks.FindAsync(id);
  
            if (taskDetail == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(taskDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaskDetailExists(int id)
        {
            return _context.Tasks.Any(e => e.Id == id);
        }

        private static TaskDetailDTO TaskToDTO(TaskDetail task) =>
            new TaskDetailDTO(task);        
    }
}
