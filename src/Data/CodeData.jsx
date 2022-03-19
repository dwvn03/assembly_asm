const CodeData = {
    Q0: {},
    Q1: {
        c: `#include <stdio.h>

int main() {
    printf("Hello world");
}`,
        x86asm: `INCLUDE emu8086.inc
ORG 100h

PRINT  "Hello world"

RET`,
        testCaseImgs: [
            `https://res.cloudinary.com/djav5udlk/image/upload/v1647485840/asm_asm/Q1_kzacxi.webp`
        ]
    },
    Q2: {
        c: `#include <stdio.h>

int main() {
    int a, b;
    printf("a = ");
    scanf("%d", &a);
    printf("b = ");
    scanf("%d", &b);

    printf("a + b = %d, ", a + b);
    printf("a - b = %d, ", a - b);
    printf("a * b = %d, ", a * b);

    if (b != 0) {
        printf("a / b = %d, ", a / b);
        printf("remainder %d", a % b);
    } else {
        printf("can't divide zero");
    }
}`,
        x86asm: `INCLUDE emu8086.inc
ORG 100h

main:
    PRINT   "a = "
    CALL    SCAN_NUM 
    MOV     AX, CX
    PRINTN 
    
    PRINT   "b = "
    CALL    SCAN_NUM
    MOV     BX, CX
    PRINTN

    CALL    SUM
    CALL    SUBT
    CALL    MULT
    CALL    DIVI
exit:    
    RET

SUM PROC
    PUSH    AX
    
    PRINT   "a + b = "
    ADD     AX, BX
    CALL    PRINT_NUM
    
    POP     AX    
    RET
SUM ENDP

SUBT PROC
    PUSH    AX 
    
    PRINT   ", a - b = "
    SUB     AX, BX
    CALL    PRINT_NUM
    
    POP     AX
    RET
SUBT ENDP

MULT PROC
    PUSH    AX 
    
    PRINT   ", a * b = "
    MUL     BX
    CALL    PRINT_NUM_UNS
    
    POP     AX    
    RET
MULT ENDP

DIVI PROC
    CMP     BX, 0
    JE      div_0
    JNE     legit
div_0:
    PRINT   ", can't divide zero"
    JMP     end_divi
legit:
    PUSH    AX 

    PRINT   ", a / b = "    
    DIV     BX
    CALL    PRINT_NUM_UNS 
    
    PRINT   ", remainder "
    MOV     AX, DX
    CALL    PRINT_NUM_UNS

    POP     AX
end_divi:
    RET
DIVI ENDP
    
DEFINE_SCAN_NUM 
DEFINE_PRINT_NUM 
DEFINE_PRINT_NUM_UNS
    
END

`,
        testCaseImgs: [
            `https://res.cloudinary.com/djav5udlk/image/upload/v1647601687/asm_asm/Q2/Q2_1_x43otw.webp`,
            `https://res.cloudinary.com/djav5udlk/image/upload/v1647601687/asm_asm/Q2/Q2_2_kzgcod.webp`,
            `https://res.cloudinary.com/djav5udlk/image/upload/v1647601687/asm_asm/Q2/Q2_3_yixqp6.webp`,
            `https://res.cloudinary.com/djav5udlk/image/upload/v1647601687/asm_asm/Q2/Q2_4_nzasr9.webp`,
            `https://res.cloudinary.com/djav5udlk/image/upload/v1647601687/asm_asm/Q2/Q2_5_z9rzzi.webp`
        ]
    },
    Q3: {
        c: `#include <stdio.h>
#include <string.h>

int digit_sum(int x);
void print_digit(int x);

int main() {
    int x;

    printf("x = ");
    scanf("%d", &x);

    print_digit(x);
    printf("\\n%d", digit_sum(x));
}

int digit_sum(int x) {
    int s = 0;
    
    while (x) {
        s += x % 10;
        x /= 10;
    }
    
    return s;
}

void print_digit(int x) {
    int n, i;
    char str[6];

    sprintf(str, "%d", x);
    n = strlen(str);

    for (i = 0; i < n; i++) {
        printf("%c", str[i]);
        if (i != n - 1)
            printf(",");
        else    
            printf(".");
    } 
}`,
        x86asm: `INCLUDE emu8086.inc
ORG 100h

main:     
    PRINT   "x = "
    CALL    SCAN_NUM 
    MOV     AX, CX
    PRINTN
    
    CALL    PRINT_DIGIT_AND_GET_SUM
print_sum:    
    MOV     AX, SI
    CALL    PRINT_NUM
exit:    
    RET

PRINT_DIGIT_AND_GET_SUM PROC 
    PUSH    AX
    MOV     BX, 10
    MOV     CX, 0
    MOV     SI, 0 
get_digit:    
    DIV     BX
    PUSH    DX
    ADD     SI, DX
    MOV     DX, 0
    INC     CX
    
    CMP     AX, 0
    JNE     get_digit
printing:
    POP     AX
    CALL    PRINT_NUM
    
    CMP     CX, 1
    JE      end_p
    
    PRINT   ", ", 0
    
    LOOP    printing
end_p:
    PRINT   ".", 0
    PRINTN
    POP     AX    
    
    RET
PRINT_DIGIT_AND_GET_SUM ENDP
    
    
DEFINE_SCAN_NUM 
DEFINE_PRINT_NUM 
DEFINE_PRINT_NUM_UNS    

END`,
        testCaseImgs: [
            `https://res.cloudinary.com/djav5udlk/image/upload/v1647683506/asm_asm/Q3/Q3_1_kbk8lz.webp`,
            `https://res.cloudinary.com/djav5udlk/image/upload/v1647683506/asm_asm/Q3/Q3_2_iczsw1.webp`,
            `https://res.cloudinary.com/djav5udlk/image/upload/v1647683506/asm_asm/Q3/Q3_3_kdjkqj.webp`
        ]
    },
    Q4: {
        c: `#include <stdio.h>

int main() {
    int sum = 0, i, j;

    for (i = 0; i <= 12; i++) {
        for (j = i; j <= 10; j++) {
            sum += i + j;
        }
    }

    printf("%d", sum);
}`,
        x86asm: `INCLUDE emu8086.inc
ORG 100h

start: 
    MOV     DX, 0
    MOV     CX, 0
loop1:
    MOV     BX, CX
    loop2:
        CMP     BX, 10
        JG      next_loop1
        
        ADD     DX, CX
        ADD     DX, BX
            
        INC     BX 
        CMP     BX, 10
        JNG     loop2
    next_loop1:
        INC     CX
        CMP     CX, 12
        JNG     loop1
print_f5:    
    MOV     AX, DX
    CALL    PRINT_NUM
exit:    
    RET
    
DEFINE_PRINT_NUM 
DEFINE_PRINT_NUM_UNS
    
END`,
        testCaseImgs: [
            `https://res.cloudinary.com/djav5udlk/image/upload/v1647683695/asm_asm/Q4_bqvgrg.webp`
        ]
    },
    Q5: {
        c: `#include <stdio.h>
#include <string.h>

int main() {
    char str[256];
    FILE * fp = NULL;
    fp = fopen("README.md", "w");

    if (fp != NULL) {
        fgets(str, 256, stdin);

        str[strcspn(str, "\\n")] = '\\0';

        fwrite(str, 1, sizeof(str), fp);
    } else {
        printf("Error");
    }

    fclose(fp);
}`,
        x86asm: `INCLUDE emu8086.inc
ORG 100h     

JMP     start

data: 
    file    DB  "README.md"
    handle  DW  ?
    buffer  DB  255 DUP(0) 
            DB  '$'      
    buffer_size = 255

start: 
    PRINT   "Enter a string (max 255 characters): ", 0 
    LEA     DI, buffer 
    MOV     DX, buffer_size 
    CALL    get_string 
        
write_to_file:
    ; file location : C:\emu8086\MyBuild\README.md
    MOV     AH, 3Ch
    MOV     CX, 0
    LEA     DX, file
    INT     21h

    MOV     handle, AX
    
    MOV     AH, 40h
    MOV     BX, handle
    LEA     DX, buffer
    MOV     CX, buffer_size
    INT     21h 
        
    MOV     AH, 3Eh
    MOV     BX, handle
    INT     21h
    
exit:   
    RET
    
DEFINE_GET_STRING 
    
END`,
        testCaseImgs: [
            `https://res.cloudinary.com/djav5udlk/image/upload/v1647684792/asm_asm/Q5/Q5_1_mk7jkg.webp`,
            `https://res.cloudinary.com/djav5udlk/image/upload/v1647684793/asm_asm/Q5/Q5_2_n9er9q.webp`
        ]
    },
    Q6: {
        c: `#include <stdio.h>
#include <string.h>

int main() {
    char str[10000];
    FILE * fp = NULL;
    fp = fopen("README2.md", "r");

    if (fp != NULL) {
        while (!feof(fp)) {
            fgets(str, 10000, fp);
            str[strcspn(str, "\\n")] = '\\0';
            puts(str);
        }
    } else {
        printf("Error");
    }

    fclose(fp);
}`,
        x86asm: `ORG 100h     

JMP     start

data: 
    file    DB  "README2.md"
    handle  DW  ?
    buffer  DB  1275 DUP(0) 
            DB  '$'
    blank   DB  1275 DUP(0) 
            DB  '$'      
    buffer_size = 1275

start: 
    ; file location : C:\emu8086\MyBuild\README2.md
    MOV     AH, 3Dh
    MOV     AL, 0
    LEA     DX, file
    INT     21h

    MOV     handle, AX
            
read_from_file:
    MOV     AH, 3Fh
    MOV     BX, handle
    LEA     DX, buffer
    MOV     CX, buffer_size
    INT     21h 
    
    CMP     AX, CX
    JB      partial_read
        
    MOV     AH, 09h
    INT     21h
    
    CALL    CLEAR_BUFFER 
                
    JMP     read_from_file
        
partial_read:
    MOV     AH, 09h
    INT     21h 
    
close_file:
    MOV     AH, 3Eh
    MOV     BX, handle
    INT     21h
    
exit:   
    RET
                                    
CLEAR_BUFFER PROC
    CLD
    LEA si, blank
    LEA di, buffer
    MOV cx, buffer_size
    REP MOVSB
    
    RET       
CLEAR_BUFFER ENDP 
    
END

`,
        testCaseImgs: [
            `https://res.cloudinary.com/djav5udlk/image/upload/v1647687092/asm_asm/Q6_vjityy.webp`
        ]
    },
    Q7: {
        c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char * longest_common_sub_str(char * str1, char * str2);

int main() {
    char str1[255], str2[255];

    printf("Input first string : ");
    fgets(str1, 255, stdin);
    str1[strcspn(str1, "\\n")] = '\\0';

    printf("Input second string : ");
    fgets(str2, 255, stdin);
    str2[strcspn(str2, "\\n")] = '\\0';

    char * result = longest_common_sub_str(str1, str2);
    if (strcmp(result, "No common substring") != 0) {
        printf("Longest common substring : ");
    }
    puts(result);
}

char * longest_common_sub_str(char * str1, char * str2) {
    int m = strlen(str1);
    int n = strlen(str2);

    int ** compare_table = (int **) calloc(m + 1, sizeof(int *));
    for (int i = 0; i <= m; i++) {
        compare_table[i] = (int *) calloc(n + 1, sizeof(int));
    }

    int len = 0;
    int row, col;

    for (int i = 0; i <= m; i++) {
        for (int j = 0; j <= n; j++) {
            if (i == 0 || j == 0) {
                compare_table[i][j] = 0;
            } else if (str1[i - 1] == str2[j - 1]) {
                compare_table[i][j] = compare_table[i - 1][j - 1] + 1;
                if (len < compare_table[i][j]) {
                    len = compare_table[i][j];
                    row = i;
                    col = j;
                }
            } else {
                compare_table[i][j] = 0;
            }
        }
    }

    if (len == 0) {
        return "No common substring";
    }

    char * resultStr = (char *) calloc(len + 1, sizeof(char));

    while (compare_table[row][col] != 0) {
        resultStr[--len] = str1[row - 1];

        row--;
        col--;
    }

    return resultStr;
}`,
        x86asm: ``,
        testCaseImgs: [
            `https://res.cloudinary.com/djav5udlk/image/upload/v1647686996/asm_asm/Q7_jued9w.webp`
        ]
    },
}

export default CodeData;