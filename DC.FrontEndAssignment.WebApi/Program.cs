using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using ElectronNET.API;
using ElectronNET.API.Entities;

namespace DC.FrontEndAssignment.WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder()
                .UseElectron(args)
                .UseStartup<Startup>()
                .Build();
    }
}