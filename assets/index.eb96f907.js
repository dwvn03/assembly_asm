import{r as l,j as c,a as e,p as d,R as _,b as h}from"./vendor.f51e895a.js";const E=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}};E();const I="modulepreload",u={},g="/",f=function(s,n){return!n||n.length===0?s():Promise.all(n.map(i=>{if(i=`${g}${i}`,i in u)return;u[i]=!0;const t=i.endsWith(".css"),r=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${i}"]${r}`))return;const o=document.createElement("link");if(o.rel=t?"stylesheet":I,t||(o.as="script",o.crossOrigin=""),o.href=i,document.head.appendChild(o),t)return new Promise((A,N)=>{o.addEventListener("load",A),o.addEventListener("error",()=>N(new Error(`Unable to preload CSS for ${i}`)))})})).then(()=>s())},b={Q0:{},Q1:{c:`#include <stdio.h>

int main() {
    printf("Hello world");
}`,x86asm:`INCLUDE emu8086.inc
ORG 100h

PRINT  "Hello world"

RET`,testCaseImgs:["https://res.cloudinary.com/djav5udlk/image/upload/v1647485840/asm_asm/Q1_kzacxi.webp"]},Q2:{c:`#include <stdio.h>

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
}`,x86asm:`INCLUDE emu8086.inc
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

`,testCaseImgs:["https://res.cloudinary.com/djav5udlk/image/upload/v1647601687/asm_asm/Q2/Q2_1_x43otw.webp","https://res.cloudinary.com/djav5udlk/image/upload/v1647601687/asm_asm/Q2/Q2_2_kzgcod.webp","https://res.cloudinary.com/djav5udlk/image/upload/v1647601687/asm_asm/Q2/Q2_3_yixqp6.webp","https://res.cloudinary.com/djav5udlk/image/upload/v1647601687/asm_asm/Q2/Q2_4_nzasr9.webp","https://res.cloudinary.com/djav5udlk/image/upload/v1647601687/asm_asm/Q2/Q2_5_z9rzzi.webp"]},Q3:{c:`#include <stdio.h>
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
}`,x86asm:`INCLUDE emu8086.inc
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

END`,testCaseImgs:["https://res.cloudinary.com/djav5udlk/image/upload/v1647683506/asm_asm/Q3/Q3_1_kbk8lz.webp","https://res.cloudinary.com/djav5udlk/image/upload/v1647683506/asm_asm/Q3/Q3_2_iczsw1.webp","https://res.cloudinary.com/djav5udlk/image/upload/v1647683506/asm_asm/Q3/Q3_3_kdjkqj.webp"]},Q4:{c:`#include <stdio.h>

int main() {
    int sum = 0, i, j;

    for (i = 0; i <= 12; i++) {
        for (j = i; j <= 10; j++) {
            sum += i + j;
        }
    }

    printf("%d", sum);
}`,x86asm:`INCLUDE emu8086.inc
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
    
END`,testCaseImgs:["https://res.cloudinary.com/djav5udlk/image/upload/v1647683695/asm_asm/Q4_bqvgrg.webp"]},Q5:{c:`#include <stdio.h>
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
}`,x86asm:`INCLUDE emu8086.inc
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
    ; file location : C:emu8086MyBuildREADME.md
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
    
END`,testCaseImgs:["https://res.cloudinary.com/djav5udlk/image/upload/v1647684792/asm_asm/Q5/Q5_1_mk7jkg.webp","https://res.cloudinary.com/djav5udlk/image/upload/v1647684793/asm_asm/Q5/Q5_2_n9er9q.webp"]},Q6:{c:`#include <stdio.h>
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
}`,x86asm:`ORG 100h     

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
    ; file location : C:emu8086MyBuildREADME2.md
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

`,testCaseImgs:["https://res.cloudinary.com/djav5udlk/image/upload/v1647687092/asm_asm/Q6_vjityy.webp"]},Q7:{c:`#include <stdio.h>
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
}`,x86asm:"",testCaseImgs:["https://res.cloudinary.com/djav5udlk/image/upload/v1647686996/asm_asm/Q7_jued9w.webp"]}};const C=l.exports.lazy(()=>f(()=>import("./TestCase.43a91d11.js"),["assets/TestCase.43a91d11.js","assets/TestCase.3372e997.css","assets/vendor.f51e895a.js"])),m=l.exports.lazy(()=>f(()=>import("./CodeBlock.6cebf2e1.js"),["assets/CodeBlock.6cebf2e1.js","assets/CodeBlock.54d8931b.css","assets/vendor.f51e895a.js"])),D=({ques:a})=>{const s=b[a];return c("div",{className:"Solution",children:[e("h3",{children:"Solution 1 : C"}),e(l.exports.Suspense,{fallback:e(d,{}),children:e(m,{lang:"c",solution:s.c})}),e("h3",{children:"Solution 2 : Assembly"}),e(l.exports.Suspense,{fallback:e(d,{}),children:e(m,{lang:"x86asm",solution:s.x86asm})}),e("h3",{children:"Test Case"}),e(l.exports.Suspense,{fallback:e(d,{}),children:e(C,{testCaseImgs:s.testCaseImgs})})]})};var P=l.exports.memo(D);var T="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABHNCSVQICAgIfAhkiAAABSJJREFUaEPtln1ME3cYx5+7Xo+2R4/SIA4nTJ06gwwsUjd8AWGM+QJsGN2IgW1mGVnYNAMUNpXMl7ApYCNDt+gWo8smc6gwmSNEKxugMBB1gQGZmZtKgBKE0hba3vXaXZuYkGyOS3sXFnNNmv5xz/P0+3m+v+f5HQKPyQd5TDhABPm/OSk6IjoiUAfEoyVQY70uKzridesEShQdEaixXpcVHeHauqVLs6UT0BNkm7DguDqIlsxSDXdXVVFc87nGCeqI9oVUrXlkpAiTSBcCILgLAZph6Ntk4IziNn11C1eRXOIEA4lYlrCetlrPyghS5nK5AEEQcP+iKAJWi8kpJeSbulobznMRySVGMJDw6JUdaSnrNWteTEC6unvhy5OVsCXzVYiKWgz6hmY4W13T2XOjOZKLSC4xgoDEpr2ueZJAO46Wl7FGIEAQCsh4IwcqTx4Fm83GuoLCttxC119Gs7a55nQHF6FTxQgC8mxs0ntrE1ZUxK9aAYMGA6xeHQ8ZWe+ArmQv9N27BwqFHH7t7IKqC/X5na163VQiuTwXBkQbXxQbE7Wv9GAxSCQoGOtLAb/fAsPEfAjLKAGEdWRn0V643HSt+Le2xt1chE4VIwjI4pi4Y2pSkX3m9FegIpVg6usGe+MXgK98C8iwCKBoGjZs2gyGkbGvu683ZU0lkstz3kG0ia+8aX4wpMNQZ+D358+AShUAGIax4hnwwzFw0A4PSPLaVKAcYPFXz8y/3lBznIvY/4rhFSQmecNGasx0Ytz0QBm9JBJ0hw6CXCbzrF0A9xfxrGGGYSC/4ENoaWkDIiDIIiP9s9su1VT6AsMbyJK4lAWMzdrO0PYA64QJDhTvgzXJSSCVYv/Q53Aw0PBTI7yfXwAyBQkYLqcwP6nmZlNdt7cwvIGEL40rk0ikeVbLKEIoZPBjbTWoAkiPA//2MY6ZYF1qOpgtE0CQQUA7rJ/3dDTnTCtI+KY9ON1Te8fpcD0B7MFZsTwWL9eVAI5LHwlipyjI37ETfm5sYt+72N0mQYbmJy6fW1dRYfcGhhdHohNefsnY/2edjFCeoil73Mb0tHmFO3IBl0ofqYlmh15XfgQqv626i8mJepvZ+LZq9lNpN/S1P0wbSMRzidvtFtPm4KdnxQ/dGWjdmJ4aPjUIDbrDR+CbM+d+13xUEH5rf8lVmUJ5sfOXhv3TCJI2k6Essp6bV+4ujFxWq9VEpVSUl7HrFn/00bJT7LAXwrW26/rbne1JEdq4UD+Z3NHRVD8wbSCT/3iR5vmtqNN5+GLtOTRIrfa8V00eePcqdrDr12gc8ww7A+iu3lutH3sjfnIOLzMyuaBm1doZltGhpg+25z6TmrIOpOxl+HDo3RAURXsuxMv6K7Bn/4E+Uh20zFsXBAVxF1+1ITNkHoHot+bmLZo9OxSRskOPs/cJ7WBvdRbEYDC4Pj1Uert3BE24euFEv69uuPN5d6T/1LYwgur7xGQeT7xvxWeii9YwIUuSB/1INUqPG10DNy4F0711WKifzUCqlHVGXL1rTtZxr+ZCUEf6Tr0bq7T26xjGDhiKBaJOi2EEUe8Oy6lq7j/+WrKSGi5yShTBjNP5ACR+Drt/SF5I5mftvrrCuyNuQX8cyw6wBWJM8Oig0oKTo3O3nLQ9FHr/u1y5zDwQOKRUm3BKgi7IrDD5CiHI0eJDlDc1BHHEGyG+5oggvnaQ73zREb476ms90RFfO8h3vugI3x31tZ7oiK8d5DtfdITvjvpa72/4KdZCqwKTsgAAAABJRU5ErkJggg==",M="/assets/facebook-square-brands.49efaed7.svg",L="/assets/youtube-square-brands.c309abb1.svg";const R=()=>e("div",{className:"footer",children:c("div",{id:"footer-wrapper",children:[e("p",{children:"\xA9 By \u0110\u1ED7 L\u1ED9c 2022"}),e("img",{src:T,alt:"penguin",className:"penguin"}),c("div",{id:"social",children:[e("a",{href:"https://www.facebook.com/luoc.do.03/",target:"_blank",className:"social-icon",children:e("img",{src:M,alt:"Personal facebook",border:"0"})}),e("a",{href:"https://www.youtube.com/channel/UC9clADyiBc2Ue2KwP1lB02g",target:"_blank",className:"social-icon",children:e("img",{src:L,alt:"Youtube channel",border:"0"})})]})]})});const p=({currTab:a,changeTab:s,executeScroll:n=null,isBottom:i=!1})=>e("div",{className:"tab",children:Array.from({length:7},(t,r)=>`Q${++r}`).map((t,r)=>e("button",{className:"tablinks "+(a==t?"active":""),onClick:()=>{s(t),i&&n()},children:t},r))});const X=({currTab:a,changeTab:s,scrollRef:n})=>c("header",{children:[e("h2",{ref:n,children:"CEA201_IA1702_HE176673_Assignment2"}),e("a",{href:"https://drive.google.com/drive/folders/1zEAOGLOnpnuhzDhdg4pAETtHRrYcckBT?usp=sharing",target:"_blank",children:"Google Drive Folder For Source Code"}),e(p,{currTab:a,changeTab:s})]});function v(){const[a,s]=l.exports.useState("Q2"),n=r=>{s(r)},i=l.exports.useRef(null);return c("div",{className:"App",children:[e(X,{currTab:a,changeTab:n,scrollRef:i}),e(P,{ques:a}),e(p,{currTab:a,changeTab:n,executeScroll:()=>{i.current.scrollIntoView({behavior:"smooth"}),console.log("scroll")},isBottom:!0}),e(R,{})]})}_.render(e(h.StrictMode,{children:e(v,{})}),document.getElementById("root"));
