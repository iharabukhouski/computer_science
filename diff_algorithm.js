// Implementation of the 'O(ND) Diff Algorithm'
// @see http://www.xmailserver.org/diff2.pdf
// @see https://github.com/igstan/igstan.ro/blob/master/_drafts/2015-01-01-paper-an-o-nd-difference-algorithm.md
// @see http://rosettacode.org/wiki/Longest_common_subsequence#Dynamic_programming.2C_walker_class
// @see http://simplygenius.net/Article/DiffTutorial1

/*
 * Returns the shortest edit script (SES)
 * SES is the shortest possible list of operation that need to be executed to transform sequence1 into sequence2
 */
function getSES(sequence1, sequence2) {

	debugger;

	const N = sequence1.length;
  const M = sequence2.length;

	const MAX = Math.max(0, M + N);

	// Endpoints (x) of the furthest reaching D-paths in diagonal k
  const V = {}//new Array();
 	//new Array(MAX * 2).fill(0).map((_, i) => V[-MAX + i] = 0)
  let x = 0;
  let y = 0;

	V[1] = 0;

	for (let D = 0; D <= MAX; D++) {
  
  	for (let k = -D; k <= D; k += 2) {
    
    	if (k === -D || (k !== D && V[ k - 1 ] < V[ k + 1 ])) {
      
      	x = V[ k + 1 ];
      } else {
      
      	x = V[ k - 1 ] + 1;
      }
    
    	y = x - k;
      
      while (x < N && y < M && sequence1[x] === sequence2[y]) {
      
      	x = x + 1;
        y = y + 1;
      }

			V[k] = x;

    	if (x >= N && y >= M) {
      
      	return;
      }
    }
  }
}

const sequence1 = [ 'a', 'b', 'c', 'a', 'b', 'b', 'a' ];
const sequence2 = [ 'c', 'b', 'a', 'b', 'a', 'c' ];

getSES(sequence1, sequence2);
