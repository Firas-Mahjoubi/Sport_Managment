import unittest
import chess
import itertools
from chess import Color, Position, Board, Piece, Pawn

class PawnTest(unittest.TestCase):

    def setUp(self):
        self.board = Board()
        self.wpawn = self.board.add(Color.white, Pawn, Position(1,4))
        self.bpawn = self.board.add(Color.black, Pawn, Position(2,3))

    def test_possible_moves(self):
        self.assertListEqual(self.wpawn.possible_moves, [Position(2, 4), Position(3, 4)])
        self.assertListEqual(self.bpawn.possible_moves, [Position(1, 3)])

    def test_possible_attacks(self):
        self.assertListEqual(self.wpawn.possible_attacks, [self.bpawn.position])
        self.assertListEqual(self.bpawn.possible_attacks, [self.wpawn.position])

if __name__ == '__main__':
    unittest.main()
