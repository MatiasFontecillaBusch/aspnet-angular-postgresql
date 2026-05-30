using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Reflection; 
using Autofac;
using Autofac.Integration.WebApi; 
using api_framework.Data; 
using api_framework.Interfaces; 

namespace api_framework
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            // 1. TUS CONFIGURACIONES NATIVAS (Se quedan exactamente igual)
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            // ============================================================
            // 2. CONFIGURACIÓN DE AUTOFAC (Lo que añadimos para tus interfaces)
            // ============================================================
            var builder = new ContainerBuilder();

            // Registra automáticamente todos tus controladores de Web API
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            // Registra tu base de datos (Contexto)
            builder.RegisterType<ApplicationDbContext>().InstancePerRequest();

            // Registra el vínculo manual de tu repositorio
            builder.RegisterType<ProductRepository>().As<IProductRepository>().InstancePerRequest();

            // Construye el contenedor y se lo asigna a la Web API global
            var container = builder.Build();
            GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(container);
            // ============================================================
        }
    }
}