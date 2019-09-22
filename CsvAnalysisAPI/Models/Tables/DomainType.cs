using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CsvAnalysisAPI.Models.Tables
{
    [PetaPoco.TableName("DomainTypes")]
    [PetaPoco.PrimaryKey("DomainTypesId")]
    public class DomainType
    {
        public int DomainTypesId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
    }
}