import unittest
import chess
import itertools
from chess import Color, Position, Board, Piece, Pawn

class RookTest(unittest.TestCase):

    def setUp(self):
        self.board = Board.from_notation([[  "",   "",   "",   "",   "",   "",   "",   ""],
                                          [  "", "WR",   "",   "",   "",   "",   "",   ""], 
                                          [  "",   "",   "",   "",   "",   "",   "",   ""],
                                          [  "",   "",   "",   "",   "",   "",   "",   ""],
                                          [  "", "WR",   "", "BR",   "", "WR",   "",   ""],
                                          [  "",   "",   "",   "",   "",   "",   "",   ""],
                                          [  "",   "",   "",   "",   "",   "",   "", "BR"], 
                                          [  "",   "",   "",   "",   "",   "",   "",   ""]])
        self.upper_rook = self.board[1][1]
        self.left_rook = self.board[4][1]
        self.right_rook = self.board[4][5]
        self.middle_rook = self.board[4][3]
        self.lower_rook = self.board[6][7]

    def test_setup(self):
        individual_rooks = {self.upper_rook, self.left_rook, self.right_rook, self.middle_rook, self.lower_rook}
        pieces = set(self.board.pieces())
        self.assertSetEqual(pieces, individual_rooks)

    def assertContainsAll(self, container, elements):
        for element in elements:
            self.assertIn(element, container)

    def test_possible_moves(self):
        upper_moves = self.upper_rook.possible_moves
        self.assertEqual(10, len(upper_moves))
        self.assertIn(Position(0, 1), upper_moves) # move up
        self.assertIn(Position(1, 0), upper_moves) # move left
        self.assertContainsAll(upper_moves, [Position(2, 1), Position(3, 1)]) # moves down
        self.assertContainsAll(upper_moves, [Position(1, col) for col in range(2, 8)]) # moves right

        left_moves = self.left_rook.possible_moves
        self.assertEqual(7, len(left_moves))
        self.assertContainsAll(left_moves, [Position(3, 1), Position(2, 1)]) # moves up
        self.assertIn(Position(4, 0), left_moves) # moves left
        self.assertContainsAll(left_moves, [Position(row, 1) for row in range(5, 8)]) # moves down
        self.assertIn(Position(4, 2), left_moves) # moves right

        right_moves = self.right_rook.possible_moves
        self.assertEqual(10, len(right_moves))
        self.assertContainsAll(right_moves, [Position(row, 5) for row in range(4)]) # moves up
        self.assertIn(Position(4, 4), right_moves) # moves left
        self.assertContainsAll(right_moves, [Position(row, 5) for row in range(5, 8)]) # moves down
        self.assertContainsAll(right_moves, [Position(4, col) for col in range(6, 8)]) # moves right

        middle_moves = self.middle_rook.possible_moves
        self.assertEqual(9, len(middle_moves))
        self.assertContainsAll(middle_moves, [Position(row, 3) for row in range(4)]) # moves up
        self.assertIn(Position(4, 2), middle_moves) # moves left
        self.assertIn(Position(4, 4), middle_moves) # moves right
        self.assertContainsAll(middle_moves, [Position(row, 3) for row in range(5, 8)]) # moves down

        lower_moves = self.lower_rook.possible_moves
        self.assertEqual(14, len(lower_moves))
        self.assertContainsAll(lower_moves, [Position(row, 7) for row in range(6)]) # moves up
        self.assertContainsAll(lower_moves, [Position(6, col) for col in range(7)]) # moves left
        self.assertIn(Position(7, 7), lower_moves) # moves down
        # no moves right

    def test_possible_attacks(self):
        self.assertEqual(0, len(self.upper_rook.possible_attacks))
        self.assertSetEqual({self.middle_rook.position}, set(self.left_rook.possible_attacks))
        self.assertSetEqual({self.middle_rook.position}, set(self.right_rook.possible_attacks))
        middle_expected = {self.left_rook.position, self.right_rook.position}
        self.assertSetEqual(middle_expected, set(self.middle_rook.possible_attacks))
        self.assertEqual(0, len(self.lower_rook.possible_attacks))

if __name__ == '__main__':
    unittest.main()
