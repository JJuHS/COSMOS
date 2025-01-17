package S11P12A708.A708.domain.code.request;

import S11P12A708.A708.domain.code.entity.Language;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ExecuteCodeRequest {

    @NotBlank
    String content;

    @NotNull
    Language language;

    @NotNull
    String inputs;
}