using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CsvAnalysisAPI.Models.Tables
{
    [PetaPoco.TableName("Classifiers")]
    [PetaPoco.PrimaryKey("ClassifiersId")]
    public class Classifier
    {
        public int ClassifiersId { get; set; }
        public int? ParentId { get; set; }
        public string Name { get; set; }
        public string GeoCode { get; set; }


        public Domain GetDomain(PetaPoco.Database db)
        {
            if (ParentId == null)
                return GetDomainFromDB(db);

            return GetParent(db).GetDomain(db);
        }

        private Domain GetDomainFromDB(PetaPoco.Database db)
        {
            PetaPoco.Sql query = PetaPoco.Sql.Builder;
            query.Append(@" select 
	                            d.*
	                            , (select c.* from Countries c where c.CountriesId = d.CountriesId for json auto, WITHOUT_ARRAY_WRAPPER ) as CountryJson
	                            , ( select dt.* from DomainTypes dt where dt.DomainTypesId = d.DomainTypesId for json auto, WITHOUT_ARRAY_WRAPPER) as DomainTypeJson
                            from Domains d
                            where d.ClassifiersId = @0", this.ClassifiersId);
            Domain domain = db.SingleOrDefault<Domain>(query);

            if (domain != null)
            {
                domain.SetJson();
                domain.SetClassifiers(db);
            }

            return domain;
        }

        private Classifier GetParent(PetaPoco.Database db)
        {
            PetaPoco.Sql query = PetaPoco.Sql.Builder;
            query.Append(@"select * from Classifiers where ClassifiersId = @0", this.ParentId.Value);
            return db.SingleOrDefault<Classifier>(query);
        }

    }
}