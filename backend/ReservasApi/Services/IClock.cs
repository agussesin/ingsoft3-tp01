namespace ReservasApi.Services;

public interface IClock
{
    DateTimeOffset Now { get; }
}

public class SystemClock : IClock
{
    public DateTimeOffset Now => DateTimeOffset.Now;
}
