namespace MeowOffice.Api.Domain;
public record ChatTurn(string Role, string Content);
public record ChatRequest(string Target, string Message, List<ChatTurn>? History, string? KnowledgeContext = null);
public record RunRequest(string Id, string Goal, string Target, string? KnowledgeContext = null);
public record StepResult(string Actor, string Title, string Status, string Output);
public record RunResult(string Id, string Title, string Target, string Status, List<StepResult> Steps, DateTimeOffset CreatedAt);
public record ReviewVerdict(bool Pass, string Comments);
public sealed class TaskRecord
{
    public string Id { get; set; } = "";
    public string Title { get; set; } = "";
    public string Target { get; set; } = "";
    public string Status { get; set; } = "running";
    public string StepsJson { get; set; } = "[]";
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
}
public static class AgentCatalog
{
    public static readonly Dictionary<string, (string Name, string Instruction)> Agents = new()
    {
        ["mochi"] = ("Mochi", "You are a research specialist. Separate facts, assumptions and unanswered questions. Cite source URLs only if supplied in context or actually obtained with available tools. You have no live web search tool. Say when research requires live browsing. Do not fabricate citations."),
        ["atlas"] = ("Atlas", "You are a software architect. Design service boundaries, API contracts, data structures, error handling and acceptance criteria. State trade-offs and assumptions. Check feasibility and consistency."),
        ["pixel"] = ("Pixel", "You are a developer specializing in React, TypeScript and C# .NET. Produce implementation plans and code snippets. Explain meaningful tests. You cannot access a repository or execute code. Never claim builds, tests or edits have been performed.")
    };
    public static string Resolve(string id) => id == "all" ? "atlas" : id;
    public static bool Valid(string id) => id == "all" || Agents.ContainsKey(id);
}
