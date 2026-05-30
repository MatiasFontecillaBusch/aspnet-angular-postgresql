using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api_framework.DTOs
{
    public class GetProductsDto :PagingDto
    {
        public string Name { get; set; }
        public bool? IsAvailable { get; set; }
    }
}