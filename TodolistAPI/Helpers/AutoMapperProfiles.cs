using AutoMapper;
using TodolistAPI.Models;

namespace TodolistAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<TaskDetail, TaskDetailDTO>().ReverseMap();
        }
    }
}
