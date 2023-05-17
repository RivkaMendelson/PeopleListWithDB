using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PeopleListWithDBMay10.Data;

namespace PeopleListWithDBMay10.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private string _connectionString;

        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("add")]
        public void AddPerson(Person person)
        {
            var db = new PersonDB(_connectionString);
            db.Add(person);
        }

        [Route("getall")]
        public List<Person> GetAllPeople()
        {
            var db = new PersonDB(_connectionString);
            return db.GetAllPeople();
        }

        [Route("update")]
        public void Update(Person person)
        {
            var db = new PersonDB(_connectionString);
            db.Update(person);
        }

        [Route("delete")]
        public void Delete(Person person)
        {
            var db = new PersonDB(_connectionString);
            db.Delete(person);
        }
    }
}
