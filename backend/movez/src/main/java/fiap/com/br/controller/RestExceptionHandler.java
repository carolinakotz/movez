package fiap.com.br.controller;

import fiap.com.br.dto.ErroDto;
import fiap.com.br.exception.DataInvalidaException;
import fiap.com.br.exception.EntidadeNaoEncontradaException;
import fiap.com.br.exception.RegraDeNegocioException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class RestExceptionHandler {

    // 404 - Recurso nao encontrado
    @ExceptionHandler(EntidadeNaoEncontradaException.class)
    public ResponseEntity<ErroDto> handleEntidadeNaoEncontrada(EntidadeNaoEncontradaException ex, HttpServletRequest request) {
        ErroDto erro = new ErroDto(
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(erro);
    }

    // 409 - Conflito / Regra de Negocio violada
    @ExceptionHandler(RegraDeNegocioException.class)
    public ResponseEntity<ErroDto> handleRegraDeNegocio(RegraDeNegocioException ex, HttpServletRequest request) {
        ErroDto erro = new ErroDto(
                HttpStatus.CONFLICT.value(),
                HttpStatus.CONFLICT.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.CONFLICT).body(erro);
    }

    // 400 - Data invalida
    @ExceptionHandler(DataInvalidaException.class)
    public ResponseEntity<ErroDto> handleDataInvalida(DataInvalidaException ex, HttpServletRequest request) {
        ErroDto erro = new ErroDto(
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro);
    }

    // 400 - Erros de Validacao do Bean Validation (@Valid)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErroDto> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpServletRequest request) {
        Map<String, String> erros = new HashMap<>();
        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            erros.put(fieldError.getField(), fieldError.getDefaultMessage());
        }

        ErroDto erro = new ErroDto(
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                "Erro de validacao nos campos informados",
                request.getRequestURI(),
                erros
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro);
    }

    // 400 - Erro de parsing de JSON no corpo da requisicao
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErroDto> handleHttpMessageNotReadable(HttpMessageNotReadableException ex, HttpServletRequest request) {
        ErroDto erro = new ErroDto(
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                "Corpo da requisicao invalido ou mal formatado",
                request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro);
    }

    // 405 - Metodo HTTP nao suportado
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ErroDto> handleMethodNotSupported(HttpRequestMethodNotSupportedException ex, HttpServletRequest request) {
        ErroDto erro = new ErroDto(
                HttpStatus.METHOD_NOT_ALLOWED.value(),
                HttpStatus.METHOD_NOT_ALLOWED.getReasonPhrase(),
                "Metodo HTTP '" + ex.getMethod() + "' nao e suportado para esta rota",
                request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(erro);
    }

    // 409 - Violacao de integridade no banco (ex: UK ou FK)
    @ExceptionHandler({DataIntegrityViolationException.class, SQLException.class})
    public ResponseEntity<ErroDto> handleDataIntegrity(Exception ex, HttpServletRequest request) {
        ErroDto erro = new ErroDto(
                HttpStatus.CONFLICT.value(),
                HttpStatus.CONFLICT.getReasonPhrase(),
                "Operacao violou uma restricao de integridade ou regra do banco de dados",
                request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.CONFLICT).body(erro);
    }

    // 500 - Erro inesperado: mensagem generica SEM stack trace e SEM detalhes do SQL
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErroDto> handleException(Exception ex, HttpServletRequest request) {
        ErroDto erro = new ErroDto(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(),
                "Ocorreu um erro interno inesperado no servidor. Tente novamente mais tarde.",
                request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(erro);
    }
}
