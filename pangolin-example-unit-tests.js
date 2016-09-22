function o (id) {
  return document.getElementById(id);
}
var subject;
var spacer = 0;

function describe(title, callback) {
  console.log((' '.repeat(spacer) + title + ' 🐐'));
  callback();
}

function addBlock (type) {
  block = document.createElement('block');
  block.id=type;
  document.getElementById('blocks').appendChild(block);
}
function writeResult (title, outcome) {
    result = document.createElement('RESULT');
    result.id=outcome;
    testResult = document.createTextNode(title);
    result.appendChild(testResult);
    document.getElementById('test-results').appendChild(result);

}
function addFailureReport(test){
  errorReport = document.createElement('P');
  errorReport.id = 'error-report';
  testToAppend = o('test-results').lastChild;
  errorString = document.createTextNode('expected '+test.subject+test.name+test.expectation);
  errorReport.appendChild(errorString);
  testToAppend.appendChild(errorReport);
}

function reportResult(title, outcome) {
  addBlock(outcome);
  writeResult(title, outcome);
}

function it(title, callback) {
  test = callback()
  if (test.result === true) {
    console.log('        ' + '🍓  ' + title + ' ✅');
    reportResult(title, 'pass');
  }
  else {
    console.log('        ' + '👎  ' + title + ' ❌<br>'+
      '                expected ' +test.subject+test.name+test.expectation);
    reportResult(title, 'fail');
    addFailureReport(test)
  }
}

function expect(item) {
  return new Test(item);
}


function Test (item) {
  this.testSubject = item;
}

Test.prototype.toEqual = function (test) {
  return {result: this.testSubject === test, subject: this.testSubject, expectation: test, name: ' to equal '};
};
Test.prototype.notToEqual = function (test) {
  return {result: this.testSubject !== test, subject: this.testSubject, expectation: test, name: ' not to equal '};
};
Test.prototype.toContain = function (test) {
  return {result: this.testSubject.indexOf(test) !== -1, subject: this.testSubject, expectation: test, name: ' to contain '};
};
Test.prototype.notToContain = function (test) {
  return {result: this.testSubject.indexOf(test) === -1, subject: this.testSubject, expectation: test, name: ' not to contain '};
};
Test.prototype.toExist = function () {
  return {result: this.testSubject !== null, subject: this.testSubject, expectation: test, name: ' to exist '};
};
window.addEventListener('load', function(){
  describe('pangolin test framework', function() {
    describe('tests', function() {
      it('1 is equal to 1', function(){
        return expect(this.thing).toEqual(1);
      });
      it('1 is not equal to 0', function(){
        return expect(1).notToEqual(0);
      });
      it('"hello" contains "hello"', function(){
        return expect('hello').toContain('hello');
      });
      it('"hello" does not contain "world"', function(){
        return expect('hello').notToContain('world');
      });
      it('"hello" does not contain "hello"', function(){
        return expect('hello').notToContain('hello');
      });
      it('checks results exist', function () {
        return expect( o('test-results') ).toExist();
      });
    });
  });
});
