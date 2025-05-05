from abc import ABC, abstractmethod

class EmailSendAbstract(ABC): 

    @abstractmethod
    def send(self, recipient: str, context: dict) -> None:
        """Envia el mail con el contexto dado."""
        pass