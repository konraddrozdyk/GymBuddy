using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

[ApiController]
[Route("api/[controller]")]
public class TrainingController : ControllerBase
{
    private readonly TrainingService _service;

    public TrainingController()
    {
        _service = new TrainingService();
    }

    [HttpGet]
    public IActionResult GetAllSessions()
    {
        var sessions = _service.GetAllSessions();
        return Ok(sessions);
    }

    [HttpGet("{date}")]
    public IActionResult GetSession(string date)
    {
        if (!DateTime.TryParse(date, out var parsedDate))
            return BadRequest("Invalid date format.");

        var session = _service.GetSession(parsedDate);
        if (session == null)
            return NotFound($"No session found for {date}");

        return Ok(session);
    }

    [HttpPost]
    public IActionResult AddSession([FromBody] TrainingSession session)
    {
        if (session == null || session.Date == default)
            return BadRequest("Invalid session data.");

        _service.SaveSession(session);
        return CreatedAtAction(nameof(GetSession), new { date = session.Date.ToString("yyyy-MM-dd") }, session);
    }

    [HttpDelete("{date}")]
    public IActionResult DeleteSession(string date)
    {
        if (!DateTime.TryParse(date, out var parsedDate))
            return BadRequest("Invalid date format.");

        _service.DeleteSession(parsedDate);
        return NoContent();
    }
}
