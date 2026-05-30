using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace api_framework.DTOs
{
    public class PagingDto
    {
        public PagingDto()
        {
            Page = 1;
            PageSize = 10;
        }

        public int Page { get; set; }

        [Range(1, 200, ErrorMessage = "El tamaño de la pagina debe ser entre 1 y 200.")]
        public int PageSize { get; set; }
    }

}