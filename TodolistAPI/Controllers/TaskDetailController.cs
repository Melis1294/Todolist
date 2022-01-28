using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http.Description;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodolistAPI.Models;
using AutoMapper;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TodolistAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskDetailController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        private readonly IMapper _mapper;

        public TaskDetailController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/values
        // get all DB entries
        [HttpGet]
        [ResponseType(typeof(List<TaskDetailDTO>))]
        public async Task<IActionResult> GetTasks()
        {
            List<TaskDetail> tasks = await _context.Tasks.ToListAsync();
            IEnumerable<TaskDetailDTO> taskDTOs = _mapper.Map<IEnumerable<TaskDetailDTO>>(tasks);
            //IEnumerable<TaskDetailDTO> taskDTOs = from t in tasks select new TaskDetailDTO(t);
            return Ok(taskDTOs);
        }

        // GET: api/TaskDetail/5
        // get the entry specified by the id
        [HttpGet("{id}")]        
        public async Task<ActionResult<TaskDetailDTO>> GetTaskDetail(int id)
        {
            var taskDetail = await _context.Tasks.FindAsync(id);
            var taskDetailDTO = _mapper.Map<TaskDetailDTO>(taskDetail);

            if (taskDetail == null)
            {
                return NotFound();
            }

            return taskDetailDTO;
        }

        // PUT: api/TaskDetail/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // To update an existing value
        [HttpPut("{id}")]
        [ResponseType(typeof(TaskDetailDTO))]
        public async Task<IActionResult> PutTaskDetail(int id, TaskDetailDTO taskDetailDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Not a valid model");
            }

            if (id != taskDetailDTO.id)
            {
                return BadRequest();
            }

            var taskDetail = await _context.Tasks.FirstOrDefaultAsync(t => t.Id == id);
            if (taskDetail == null)
            {
                return NotFound();
            }

            taskDetail = _mapper.Map<TaskDetail>(taskDetailDTO);            

            _context.Entry(taskDetail).State = EntityState.Modified;

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
        public async Task<IActionResult> PostTaskDetail(TaskDetailDTO taskDetailDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var taskDetail = _mapper.Map<TaskDetail>(taskDetailDTO);
            /*var taskDetail = new TaskDetail()
            {
                Title = taskDetailDTO.title,
                Description = taskDetailDTO.description,
                Completed = taskDetailDTO.taskCompleted
            };*/

            _context.Tasks.Add(taskDetail);
            await _context.SaveChangesAsync();

            return StatusCode(201);//return CreatedAtAction("GetTaskDetail", new { id = taskDetail.Id }, TaskToDTO(taskDetail));
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
