using AutoMapper;
using TodolistAPI.Models;

namespace TodolistAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<TaskDetail, TaskDetailDTO>()
                .ForMember(dest =>
                dest.title,
                opt => opt.MapFrom(src => src.Title))
                .ForMember(dest =>
                dest.description,
                opt => opt.MapFrom(src => src.Description))
                .ForMember(dest =>
                dest.completed,
                opt => opt.MapFrom(src => src.Completed));

            CreateMap<TaskDetailDTO, TaskDetail>()
                .ForMember(dest =>
                dest.Title,
                opt => opt.MapFrom(src => src.title))
                .ForMember(dest =>
                dest.Description,
                opt => opt.MapFrom(src => src.description))
                .ForMember(dest =>
                dest.Completed,
                opt => opt.MapFrom(src => src.completed));
        }
    }
}
