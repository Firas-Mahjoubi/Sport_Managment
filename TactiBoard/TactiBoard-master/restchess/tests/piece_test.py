import unittest
import chess
import itertools
from chess import Color, Position, Board, Piece, Pawn

class PawnTest(unittest.TestCase):

    def setUp(self):
        self.board = Board.from_notation(chess.STARTING_NOTATION)

    def test_row(self):
        for piece in self.board.pieces():
            self.assertEqual(piece.position.row, piece.row)

    def test_col(self):
        for piece in self.board.pieces():
            self.assertEqual(piece.position.col, piece.col)

    def test_is_white(self):
        for piece in self.board.pieces():
            self.assertEqual(piece.color == Color.white, piece.is_white)

    def test_is_black(self):
        for piece in self.board.pieces():
            self.assertEqual(piece.color == Color.black, piece.is_black)

if __name__ == '__main__':
    unittest.main()
