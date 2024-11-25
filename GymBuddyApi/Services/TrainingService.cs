using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;

public class TrainingService
{
    private readonly string DataFolder = "Data";
    
    public TrainingService()
    {
        if (!Directory.Exists(DataFolder))
        {
            Directory.CreateDirectory(DataFolder);
        }
    }

    public List<TrainingSession> GetAllSessions()
    {
        return Directory.GetFiles(DataFolder, "*.json")
            .Select(file => JsonSerializer.Deserialize<TrainingSession>(File.ReadAllText(file)))
            .Where(session => session != null)
            .ToList();
    }

    public TrainingSession GetSession(DateTime date)
    {
        string filePath = Path.Combine(DataFolder, $"{date:yyyy-MM-dd}.json");
        if (!File.Exists(filePath)) return null;

        string json = File.ReadAllText(filePath);
        return JsonSerializer.Deserialize<TrainingSession>(json);
    }

    public void SaveSession(TrainingSession session)
    {
        string filePath = Path.Combine(DataFolder, $"{session.Date:yyyy-MM-dd}.json");
        string json = JsonSerializer.Serialize(session, new JsonSerializerOptions { WriteIndented = true });
        File.WriteAllText(filePath, json);
    }

    public void DeleteSession(DateTime date)
    {
        string filePath = Path.Combine(DataFolder, $"{date:yyyy-MM-dd}.json");
        if (File.Exists(filePath))
        {
            File.Delete(filePath);
        }
    }
}
