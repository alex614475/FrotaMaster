using FrotaMaster.API.Authentication;
using FrotaMaster.Application;
using FrotaMaster.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using FrotaMaster.Application.Authentication; 


var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddControllers();


// Application
builder.Services.AddApplication();

builder.Services.AddScoped<ITokenManager, TokenManager>();

builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.TokenValidationParameters =
            TokenHelpers.GetTokenValidationParameters(builder.Configuration);
    });

builder.Services.AddAuthorization();


// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "FrotaMaster API",
        Version = "v1",
        Description = "API para gerenciamento de frota"
    });
});


// Infrastructure
builder.Services.AddInfrastructure(builder.Configuration);


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();



using (var scope = app.Services.CreateScope())
{
    try
    {
        var db = scope.ServiceProvider.GetRequiredService<FrotaMaster.Infrastructure.Persistence.FrotaMasterDbContext>();
        db.Database.Migrate();
        Console.WriteLine("✅ Migrações executadas com sucesso!");
    }
    catch (Exception ex)
    {
        Console.WriteLine("❌ Erro ao aplicar migrations:");
        Console.WriteLine(ex.Message);
    }
}



if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors("AllowAngular");

app.UseAuthentication();
app.UseAuthorization();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapControllers();


app.MapGet("/ping", () => "FrotaMaster API rodando!");


app.MapFallbackToFile("index.html");

app.Run();

