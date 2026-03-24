"""
Debounce de mensajes de WhatsApp.

Cuando un usuario manda varios mensajes seguidos, los acumula durante
DEBOUNCE_SECONDS y luego llama flush_fn UNA sola vez con todos los textos.
"""
import threading

_lock = threading.Lock()
_pending: dict[str, dict] = {}

DEBOUNCE_SECONDS = 3


def schedule_response(key: str, message: str, context: dict, flush_fn) -> None:
    """
    Acumula el mensaje y (re)inicia el timer.
    flush_fn(messages: list[str], context: dict) se invoca al vencer el timer.
    """
    with _lock:
        if key in _pending:
            _pending[key]["timer"].cancel()
            _pending[key]["messages"].append(message)
        else:
            _pending[key] = {"messages": [message], "context": context}

        timer = threading.Timer(DEBOUNCE_SECONDS, _flush, args=(key, flush_fn))
        _pending[key]["timer"] = timer
        timer.start()


def _flush(key: str, flush_fn) -> None:
    with _lock:
        if key not in _pending:
            return
        entry = _pending.pop(key)
    try:
        flush_fn(entry["messages"], entry["context"])
    except Exception as e:
        print(f"[DEBOUNCE] Error en flush para key={key}: {e}")
