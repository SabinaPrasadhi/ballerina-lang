package src.test.resources.functionmocktest3.pkg;

// this function should not get called as what is mocked is functionmocktest2.pkg's intAdd
public function intAdd (int a, int b) (int) {
    return a * b;
}
